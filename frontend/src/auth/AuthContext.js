import { createContext, useState, useContext } from "react";
import axios from "axios"; //   Import axios for API calls

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  //   Register function
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      return response.data; // Return response to handle in the frontend
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const { token, user } = response.data; 
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token); // Store token
      
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Invalid email or password"); // Show error to user
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}> {/*   Added register */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);