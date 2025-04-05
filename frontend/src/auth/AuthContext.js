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

  // ✅ Logout function (memoized)
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  }, []);

  // ✅ Fetch user profile (safe with logout dependency)
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout(); // Clear token if invalid
    }
  }, [logout]);

  // ✅ Load user if token exists on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  // ✅ Register user
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

  // ✅ Login user
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
