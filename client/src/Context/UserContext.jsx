import React, { createContext, useState, useEffect } from "react";
import api from "../utils/axios";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAuth, setOpenAuth] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await api.get(API_PATHS.AUTH.GET_PROFILE, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data); // fixed: use response.data
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    // Use token or accessToken depending on backend response
    localStorage.setItem("accessToken", userData.token || userData.accessToken);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    setSearchResults([]);
    localStorage.removeItem("accessToken");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        openAuth,
        setOpenAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
