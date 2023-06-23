import React, { useEffect, useState } from "react";
import "./edit.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";
import { api, header } from "../../api/api";

const Edit = () => {
  const params = useParams();
  const postId = params.id;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [singleData, setSingleData] = useState({});

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0].name);
  };
  const onChangeHandle = (e) => {
    setSingleData({ ...singleData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(header);
    axios
      .get(`${api.getPostsById}/post/${postId}`, header)
      .then((response) => {
        console.log(response.data.data);
        setSingleData(response.data.data);

        setImage(response.data.data.imgURL);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("imgURL", image);
    console.log(formData);

    setError("");
    console.log(header);
    axios
      .put(`${api.editPostsById}/post/${postId}`, formData, header)
      .then((response) => {
        console.log(response.data.data);
        window.alert(response.data.message);
        setSingleData({ title: "", desc: "" });
        setImage("");
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  }
  return (
    <div className="post-container">
      <div className="post">
        <div className="title">
          {" "}
          <span>Create Your Post</span>{" "}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Title </span>
            <input
              type="text"
              required
              placeholder="title"
              name="title"
              value={singleData.title}
              onChange={onChangeHandle}
            />
            <span>
              Description <h6>(optional)</h6>{" "}
            </span>
            <input
              type="text"
              placeholder="description"
              name="desc"
              value={singleData.desc}
              onChange={onChangeHandle}
            />
            <span>
              Add image <h6>(optional)</h6>
            </span>
            <img
              style={{ height: "60px", width: "60px" }}
              src={image}
              alt=""
              srcset=""
            />

            <input
              className="file"
              type="file"
              placeholder="select image"
              name="imgURL"
              onChange={handleImageChange}
            />
            <button type="submit">Create</button>
          </div>
        </form>

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

export default Edit;
