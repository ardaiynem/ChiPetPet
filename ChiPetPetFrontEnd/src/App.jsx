import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import { AlertProvider } from "./AlertContext";

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <MainPage />
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
