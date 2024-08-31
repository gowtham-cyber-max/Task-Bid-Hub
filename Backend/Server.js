const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const multer = require("multer");
const connectToMongo=require("./DB/mongo")
const { Readable } = require('stream');
const {getAllUser}=require("./Controllers/BidList")

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI;

const conn=connectToMongo();


let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'photos',
  });
});

const upload = multer();

app.post("/upload", upload.array("files"), (req, res) => {
  try {
    console.log("start");
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
          message: "Files uploaded",
          files: uploadedFiles, // Return details of all uploaded files
        });
        console.log("end");
      })
      .catch(err => {
        console.error("Error during multiple file uploads:", err);
        res.status(500).send({ message: "Upload failed", error: err.message });
      });

  } catch (err) {
    console.error("Error during upload:", err);
    res.status(500).send({ message: "Upload failed", error: err.message });
  }
});

app.get('/download/:id', async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    console.log(`Fetching file with id: ${req.params.id}`);

    const files = await gfs.find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      console.log('No file found with that ID.');
      return res.status(404).send({ message: "No file found" });
    }

    console.log(`File found: ${files[0].filename}`);
    const chunks = [];

    gfs.openDownloadStream(fileId)
      .on('data', (chunk) => {
        console.log('Receiving data chunk');
        chunks.push(chunk);
      })
      .on('error', (error) => {
        console.error('Error during file download:', error);
        res.status(500).send({ message: "Download failed", error: error.message });
      })
      .on('end', () => {
        console.log('Download completed');
        const fileBuffer = Buffer.concat(chunks);
        res.setHeader('Content-Type', files[0].contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${files[0].filename}"`);
        res.send(fileBuffer);
      });
  } catch (err) {
    console.error("Error during download:", err);
    res.status(500).send({ message: "Download failed", error: err.message });
  }
});

app.get("/get/alluser", getAllUser);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
