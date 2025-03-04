const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  length: Number,
  originalName: String,
  fileType: String
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
