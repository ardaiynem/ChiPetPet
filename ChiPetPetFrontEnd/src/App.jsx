import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <MainPage />
      </AuthProvider>
    </>
  );
}

export default App;
