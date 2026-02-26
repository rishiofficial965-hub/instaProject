import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data.user;
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    return response.data.user;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/auth/get-me");
    return response.data.user;
    
  } catch (err) {
    console.error("GetMe error:", err);
    throw err;
  }
}
