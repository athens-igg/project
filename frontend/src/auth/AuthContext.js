/*import { createContext, useState, useContext } from "react";
import axios from "axios"; // ✅ Import axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      return response.data; // Return response to handle in the frontend
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token); // Store token

      setUser(user);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Invalid email or password"); // Show error to user
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {" "}
      {/* ✅ Added register */ /*}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/

//OUR UPDATED CODE
/*
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // ✅ Use axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Set token in axios headers globally
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // ✅ Load user from token on first app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserProfile();
    }
  }, []);

  // ✅ Fetch user profile using stored token
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Clear token if invalid
    }
  };

  // ✅ Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token); // ✅ Set token in axios headers
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/

//newly updated code
/*
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Set token globally for axios
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // ✅ Fetch user profile (wrapped in useCallback)
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Clear token if invalid
    }
  }, []); // ✅ Empty dependency array ensures function doesn't change

  // ✅ Auto load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserProfile();
    }
  }, [fetchUserProfile]); // ✅ Now it's safe to include it

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/

//updated logout

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  // ✅ Set token globally for axios
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  }, []); // ✅ Memoize logout so it doesn't recreate on every render

  // ✅ Fetch user profile (with logout dependency)
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Clear token if invalid
    }
  }, [logout]); // ✅ Now includes `logout` in dependencies

  // ✅ Auto load user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserProfile();
    }
  }, [fetchUserProfile]); // ✅ Now it's safe to include it

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
