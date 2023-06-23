const URL = "http//localhost:5000/api";

export const api = {
  login: `${URL}/accounts/login`,
  signup: `${URL}/accounts/signup`,
  craetePost: `${URL}`,
  getPosts: `${URL}`,
  getUsersPosts: `${URL}`,
  getPostsById: `${URL}`,
  editPostsById: `${URL}`,
  deletePost: `${URL}`,
};

export const header = {
  headers: {
    Authorization: `${localStorage.getItem("auth-token")}`,
  },
  withCredentials: true,
};
