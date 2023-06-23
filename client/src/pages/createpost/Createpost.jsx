import React, { useState } from "react";
import "./create.scss";
import { Link, useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import axios from "axios";
import { api, header } from "../../api/api";

const Createpost = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("imgURL", image);

    setError("");
    setLoading(true); // Set loading to true

    axios
      .post(`${api.craetePost}/post`, formData, header)
      .then((response) => {
        console.log(response.data.data);
        window.alert("file created successfully");
        setLoading(false); // Set loading to false after successful request
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
        setLoading(false); // Set loading to false after error response
      });
  }

  return (
    <div className="post-container">
      <div className="post">
        <div className="title">
          <span>Create Your Post</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Title</span>
            <input type="text" required placeholder="title" name="title" />
            <span>
              Description <h6>(optional)</h6>
            </span>
            <input type="text" placeholder="description" name="desc" />
            <span>
              Add image <h6>(optional)</h6>
            </span>
            <input
              className="file"
              type="file"
              placeholder="select image"
              name="imgURL"
              onChange={handleImageChange}
            />
            <button type="submit" disabled={loading}>
              Create
            </button>
          </div>
        </form>
        {loading && <CircularProgress />}{" "}
        {/* Display the spinner while loading */}
        {error && (
          <span>
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          </span>
        )}
      </div>
    </div>
  );
};

export default Createpost;
