import axios from "axios";
import React, { useState } from "react";
import './CsvInput.css';  // Make sure your CSS file is correctly imported

function CsvInput() {
  const [file, setFile] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
formData.append("files", file);
    try {
      const response = await axios.post("http://localhost:5000/upload", formData);
      console.log(response.data.files[0].id);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="body-csv-input">
      <form onSubmit={onSubmit}>
        <div className="csv-input" onDrop={onDrop} onDragOver={onDragOver}>
          <div className="input-field">
            <input
              type="file"
              onChange={onChange}
              style={{ display: 'none' }}
              id="fileInput"
              name="files"
            />
            <label htmlFor="fileInput" className="file-label">
              {file ? file.name : "Choose or drop a file"}
            </label>
          </div>
          <button type="submit" className="file-button">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CsvInput;
