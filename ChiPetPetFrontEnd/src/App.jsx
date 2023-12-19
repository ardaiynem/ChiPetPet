import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import { AlertProvider } from "./AlertContext";
import { ProfilesContextProvider } from "./ProfilesContext";

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <ProfilesContextProvider>
            <MainPage />
          </ProfilesContextProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
