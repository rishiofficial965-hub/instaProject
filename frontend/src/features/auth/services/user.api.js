import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function followUser(username) {
  const response = await api.post(`/users/follow/${username}`);
  return response.data;
}

export async function unfollowUser(username) {
  const response = await api.post(`/users/unfollow/${username}`);
  return response.data;
}

export async function updateFollowStatus(followerUsername, status) {
  const response = await api.patch("/users/follow/status", {
    followerUsername,
    status,
  });
  return response.data;
}
