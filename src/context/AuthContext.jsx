import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import axios from "../axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { nav } from "motion/react-client";

// Create context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/admin/signin", { email, password });
      const data = response.data.data.user
      const token = response.data.data.token;
      console.log(data);
      setAdmin(data);
      localStorage.setItem("apiKey", token);
      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/admin/dashboard");
      return { success: true, message: "Sign in successful" };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Sign in failed" };
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signOut = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem("apiKey");
    navigate("/admin");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ admin, loading, signIn, signOut, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};