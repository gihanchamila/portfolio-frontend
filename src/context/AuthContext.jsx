import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!apiKey);

  // Function to login (set API key)
  const login = async (enteredApiKey) => {
    try {
      const response = await fetch("http://localhost:5000/api/private/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api_key": enteredApiKey, // Send API key in header
        },
      });

      if (response.ok) {
        setApiKey(enteredApiKey);
        setIsAuthenticated(true);
        localStorage.setItem("apiKey", enteredApiKey); // Save API key
        return { success: true, message: "Login successful!" };
      } else {
        return { success: false, message: "Invalid API Key." };
      }
    } catch (error) {
      return { success: false, message: "Error connecting to the server." };
    }
  };

  // Function to logout (clear API key)
  const logout = () => {
    setApiKey(null);
    setIsAuthenticated(false);
    localStorage.removeItem("apiKey");
  };

  return (
    <AuthContext.Provider value={{ apiKey, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
