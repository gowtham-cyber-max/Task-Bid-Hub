const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Readable } = require('stream');
const { GridFSBucket, ObjectId } = require('mongodb');

dotenv.config({ path: './.env' });

const mongoURI = process.env.MONGODB_URI;

let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'photos',
  });
});

// Upload multiple files
const addFile = (req, res) => {
  try {
    console.log("Start file upload");
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }

    const uploadPromises = files.map(file => {
      const readableFileStream = new Readable();
      readableFileStream.push(file.buffer);
      readableFileStream.push(null);

      return new Promise((resolve, reject) => {
        const uploadStream = gfs.openUploadStream(file.originalname, {
          contentType: file.mimetype,
        });

        readableFileStream.pipe(uploadStream)
          .on('error', (error) => {
            console.error('Error during file upload:', error);
            reject(error);
          })
          .on('finish', () => {
            resolve({
              id: uploadStream.id,
              name: file.originalname,
              bucketName: 'photos',
              size: file.size,
            });
          });
      });
    });

    Promise.all(uploadPromises)
      .then(uploadedFiles => {
        res.send({
          message: "Files uploaded successfully",
          files: uploadedFiles, // Return details of all uploaded files
        });
        console.log("End file upload");
      })
      .catch(err => {
        console.error("Error during multiple file uploads:", err);
        res.status(500).send({ message: "Upload failed", error: err.message });
      });

  } catch (err) {
    console.error("Error during upload:", err);
    res.status(500).send({ message: "Upload failed", error: err.message });
  }
}

// Fetch file by ID
async function getFile(req, res) {
  try {
    const fileId = new ObjectId(req.params.id);
    console.log(`Fetching file with id: ${req.params.id}`);

    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'photos' });

    const file = await mongoose.connection.db.collection('photos.files').findOne({ _id: fileId });

    if (!file) {
      console.log('No file found with that ID.');
      return res.status(404).send({ message: 'No file found' });
    }

    console.log(`File found: ${file.filename}`);

    const chunks = [];
    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream
      .on('data', (chunk) => {
        console.log('Receiving data chunk');
        chunks.push(chunk);
      })
      .on('error', (error) => {
        console.error('Error during file download:', error);
        res.status(500).send({ message: 'Download failed', error: error.message });
      })
      .on('end', () => {
        console.log('Download completed');
        const fileBuffer = Buffer.concat(chunks);
        res.setHeader('Content-Type', file.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
        res.send(fileBuffer);
      });
  } catch (err) {
    console.error('Error during download:', err);
    res.status(500).send({ message: 'Download failed', error: err.message });
  }
}

module.exports = {
  addFile,
  getFile
}
