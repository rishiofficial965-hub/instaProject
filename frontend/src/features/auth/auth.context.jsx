import {  useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; 
import { getMe, login, register } from "./services/auth.api";

//same func check once
//not verified
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetMe();
  }, []);

  const handleLogin = async (username, password) => {
  setLoading(true);
  try {
    const userData = await login(username, password);
    setUser(userData);
    return { success: true, data: userData };
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
      const userData = await register(username, email, password);
      setUser(userData);
      return userData;
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
      const userData = await getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      console.error(err);
      throw err;
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}