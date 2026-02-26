import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function getfeed() {
  const response = await api.get("/post/feed");
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post(`/post/like/${postId}`);
  return response.data;
}

export async function createPost(formData) {
  const response = await api.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getUserPosts() {
  const response = await api.get("/post");
  return response.data;
}

export async function getPostDetail(postId) {
  const response = await api.get(`/post/details/${postId}`);
  return response.data;
}
