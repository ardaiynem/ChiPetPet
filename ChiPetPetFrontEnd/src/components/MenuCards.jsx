import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";

import redFox from "../assets/profile_pictures/red_fox.jpg"
import whiteFox from "../assets/profile_pictures/arctic_fox.jpg"
import bird1 from "../assets/profile_pictures/bird1.jpeg"
import bird2 from "../assets/profile_pictures/bird2.jpg"
import blackCat from "../assets/profile_pictures/black_cat.jpg"
import butterfly from "../assets/profile_pictures/butterfly.jpg"
import dog1 from "../assets/profile_pictures/dog1.jpg"
import dog2 from "../assets/profile_pictures/dog2.jpg"
import turtle from "../assets/profile_pictures/turtle.jpg"
import whiteCat from "../assets/profile_pictures/white_cat.jpg"

import { PanelContext } from "../contexts/panelContext";
import SearchPetPanel from "../components/SearchPetPanel";
import SingleAnimalPanel from "../components/SingleAnimalPanel";
import SearchVeterinarian from "../components/user/SearchVeterinarian";
import MyPets from "../components/user/MyPets";
import SearchAnimalByType from "../components/SearchAnimalByType";
import AnimalList from "../components/shelter/animalList";
import AddNewAnimal from "../components/shelter/addNewAnimal";
import UploadExcell from "../components/shelter/uploadExcellPage";
import ApplicationsList from "../components/shelter/adoptionApplications";
import HealthReportList from "../components/veterinerian/HealthReportList";
import UploadHealthRecord from "../components/veterinerian/uploadPage";
import AppointmentList from "../components/veterinerian/appointmentApplications";
import MessagePage from "../components/MessagePage";
import AdoptionApplicationsAdmin from "../components/admin/adoptionApplicationsAdmin";
import VerificationRequests from "../components/admin/verificationRequests";
import SearchShelter from "../components/shelter/searchShelter";
import Profile from "./Profile";
import PetBlog from "./PetBlog";
import MyApplications from "../components/user/MyApplications";
import GuidePage from "./GuidePage";
import { useAuth } from "../AuthContext";


function MenuCards() {
  const { userDetails } = useAuth();
  const profilePictures = [redFox, whiteFox, bird1, bird2, blackCat, butterfly, dog1, dog2, turtle, whiteCat];
  const profilePictureIndex = userDetails.user_id % profilePictures.length;

  const [role, setRole] = useState("user");
  const [cards, setCards] = useState([]);
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  let cardHeadersUser = [
    { name: "Search Pet", element: <SearchAnimalByType /> },
    { name: "Search Veterinarian", element: <SearchVeterinarian /> },
    { name: "Search Shelter", element: <SearchShelter /> },
    { name: "My Applications", element: <MyApplications /> },
    { name: "Appointments", element: <AppointmentList /> },
    { name: "My Pet", element: <MyPets /> },
    { name: "Pet Blog", element: <PetBlog /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
    { name: "Add New Animal", element: <AddNewAnimal /> },
    { name: "Verification Operations", element: <VerificationRequests /> },
    { name: "Upload Health Records", element: <UploadHealthRecord /> },
    { name: "Guide", element: <GuidePage /> }
  ];

  let cardHeadersShelter = [
    ,
    { name: "Adoption Application", element: <ApplicationsList /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
  ];

  let cardHeadersVeterinarian = [
    ,
    { name: "Upload Health Records", element: <UploadHealthRecord /> },
    { name: "Adoption Application", element: <AppointmentList /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
  ];

  let cardHeadersAdmin = [
    ,
    { name: "Adoption Application", element: <AdoptionApplicationsAdmin /> },
    { name: "Verification Operations", element: <VerificationRequests /> },
    { name: "Profile", element: <Profile role={role} /> },
  ];

  useEffect(() => {
    switch (role) {
      case "user":
      case "expert":
        setCards(cardHeadersUser);
        break;
      case "shelter":
        setCards(cardHeadersShelter);
        break;
      case "veterinarian":
        setCards(cardHeadersVeterinarian);
        break;
      case "admin":
        setCards(cardHeadersAdmin);
        break;
      default:
        setCards([]);
        break;
    }
    console.log("role was", role);
  }, [role]);

  const handlePanelChange = (card) => {
    setCurrentPanel(card.element);
  };

  return (
    <>
      <div className="p-0 h-100 w-100 d-flex">
        <div className="w-50 p-3" style={{ flex: "3 3 auto" }}>
          <div
            className="d-flex flex-column flex-wrap"
            style={{ maxHeight: "90vh" }}
          >
            {cards.map((card, i) => (
              <Card
                key={i}
                className="mb-3 ms-3 flex-shrink-1"
                style={{ width: "300px" }}
              >
                <Card.Header as="h5">{card.name}</Card.Header>
                <Card.Body>
                  <Button
                    className="w-100"
                    onClick={() => handlePanelChange(card)}
                  >
                    Go
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        <div
          className="d-flex w-50 flex-column justify-content-center align-items-center flex-wrap gap-3"
          style={{ flex: "2 2 auto" }}
        >
          <img src={profilePictures[profilePictureIndex]} style={{ width: "300px", borderRadius: "50%" }} />
          <span className="badge rounded-pill bg-primary">
            {role.toUpperCase()}
          </span>
        </div>
      </div>
    </>
  );
}

export default MenuCards;
