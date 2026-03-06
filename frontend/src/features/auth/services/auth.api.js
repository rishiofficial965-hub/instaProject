import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axios.defaults.withCredentials = true;

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
export async function updateProfile(profileData) {
  try {
    const isFormData = profileData instanceof FormData;
    const response = await api.patch("/users/profile", profileData, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data.user;
  } catch (err) {
    console.error("Update profile API error details:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    throw err;
  }
}
