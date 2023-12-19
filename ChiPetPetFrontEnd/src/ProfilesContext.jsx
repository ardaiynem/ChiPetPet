import redFox from "./assets/profile_pictures/red_fox.jpg";
import whiteFox from "./assets/profile_pictures/arctic_fox.jpg";
import bird1 from "./assets/profile_pictures/bird1.jpeg";
import bird2 from "./assets/profile_pictures/bird2.jpg";
import blackCat from "./assets/profile_pictures/black_cat.jpg";
import butterfly from "./assets/profile_pictures/butterfly.jpg";
import dog1 from "./assets/profile_pictures/dog1.jpg";
import dog2 from "./assets/profile_pictures/dog2.jpg";
import turtle from "./assets/profile_pictures/turtle.jpg";
import whiteCat from "./assets/profile_pictures/white_cat.jpg";
import cat1 from "./assets/profile_pictures/cat1.jpeg";
import React, { createContext, useContext, useState } from "react";

const ProfilesContext = createContext();
const profilePictures = [
  redFox,
  whiteFox,
  bird1,
  bird2,
  blackCat,
  butterfly,
  dog1,
  dog2,
  turtle,
  whiteCat,
  cat1,
];
export const useProfiles = () => useContext(ProfilesContext);

export const ProfilesContextProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(profilePictures);
  const getProfile = (user_id) => {
    return profiles[user_id % profilePictures.length];
  };

  return (
    <ProfilesContext.Provider value={{ getProfile }}>
      {children}
    </ProfilesContext.Provider>
  );
};
