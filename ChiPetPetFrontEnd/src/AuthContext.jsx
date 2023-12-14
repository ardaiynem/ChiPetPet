import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const login = (userDetails) => {
    // Implement your login logic here
    setUserDetails(userDetails);
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setUserDetails();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
