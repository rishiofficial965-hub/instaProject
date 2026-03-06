import {  useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; 
import { getMe, login, register, updateProfile } from "../services/auth.api";


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetMe();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleLogin = async (username, password) => {
  setLoading(true);
  try {
    const data = await login(username, password);
    setUser(data);
    return { success: true, data: data };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Invalid username or password"
    };
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await register(username, email, password);
      setUser(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
  try {
    const data = await getMe();
    setUser(data);
    return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    setLoading(true);
    try {
      const updatedUser = await updateProfile(profileData);
      setUser(prev => ({ ...prev, ...updatedUser }));
      return { success: true, data: updatedUser };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Error updating profile"
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        handleLogin,
        handleRegister,
        handleGetMe,
        handleUpdateProfile,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
