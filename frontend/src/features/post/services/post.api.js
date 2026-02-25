import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
