// const URL = "https://postapp-n67x.onrender.com/api";
// const URL = "http//localhost:5000/api";

// export const api = {
//   login: `${URL}/accounts/login`,
//   signup: `${URL}/accounts/signup`,
//   craetePost: `${URL}`,
//   getPosts: `${URL}`,
//   getUsersPosts: `${URL}`,
//   getPostsById: `${URL}`,
//   editPostsById: `${URL}`,
//   deletePost: `${URL}`,
// };

// export const header = {
//   headers: {
//     Authorization: `${localStorage.getItem("auth-token")}`,
//   },
//   withCredentials: true,
// };

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${localStorage.getItem("auth-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
