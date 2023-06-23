import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, header } from "../api/api";

const Singlepost = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    axios
      .get(`${api.getUsersPosts}/post/user`, header)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        setData([]);
        console.log(error);
        setError(error.response.data.message);
      });
  }, [data]);

  const TruncatedText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length >= maxWords && !show) {
      const truncatedText = words.slice(0, maxWords).join(" ");
      return truncatedText;
    } else {
      return text;
    }
  };
  return (
    <div>
      {data.length &&
        data.map((x, i) => {
          const formattedDate = formatDate(x.createdAt);
          const words = x.desc;
          var description = TruncatedText(words, 50);
          return (
            <>
              <Card
                key={x._id}
                sx={{
                  maxWidth: 580,
                  margin: "auto",
                  marginTop: "100px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={x.imgURL}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {x.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {description}

                      {description.length > 50 ? (
                        <h4
                          onClick={() => {
                            return show ? setShow(false) : setShow(true);
                          }}
                          style={{ textDecoration: "underlined" }}
                        >
                          {show ? "view less" : "view more"}
                        </h4>
                      ) : null}
                    </Typography>
                    <Typography
                      style={{ marginTop: "20px" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      posted by {x.user.name} on {formattedDate}
                    </Typography>
                    <Box
                      style={{
                        display: "flex",
                        float: "right",
                        padding: "20px",
                        gap: "20px",
                      }}
                    >
                      <Link to={`/posts/${x._id}`}>
                        <Button variant="contained" color="success">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          axios
                            .delete(`${api.deletePost}/post/${x._id}`, header)
                            .then((response) => {
                              window.alert(response.data.message);
                            })
                            .catch((err) => {
                              window.alert(err.response.data.message);

                              console.log(err.response.data.message);
                            });
                        }}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
              ;
            </>
          );
        })}
    </div>
  );
};

export default Singlepost;
