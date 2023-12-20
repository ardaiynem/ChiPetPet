import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";

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
import UserAppointments from "./user/UserAppointments";
import GuidePage from "./GuidePage";
import SystemRecords from "./admin/SystemRecords";
import VetAnimalList from "./veterinerian/VetAnimalList";
import { useAuth } from "../AuthContext";
import { useProfiles } from "../ProfilesContext";

function MenuCards() {
  const { userDetails } = useAuth();

  const { getProfile } = useProfiles();

  //const [role, setRole] = useState("user");

  const [verified, setVerified] = useState(userDetails.verified);
  const [role, setRole] = useState(
    verified.toUpperCase() === "TRUE" ? userDetails.role.toLowerCase() : "user"
  );
  const [cards, setCards] = useState([]);
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  /* let cardHeadersUser = [
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
    { name: "Guide", element: <GuidePage /> },
    { name: "Upload Health Records", element: <UploadHealthRecord /> },
  ]; */

  let cardHeadersUser = [
    { name: "Search Pet", element: <SearchAnimalByType /> },
    { name: "Search Veterinarian", element: <SearchVeterinarian /> },
    { name: "Search Shelter", element: <SearchShelter /> },
    { name: "My Applications", element: <MyApplications /> },
    { name: "Appointments", element: <UserAppointments /> },
    { name: "My Pet", element: <MyPets /> },
    { name: "Pet Blog", element: <PetBlog /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
    { name: "Guide", element: <GuidePage /> },
  ];

  let cardHeadersShelter = [
    ,
    { name: "Adoption Application", element: <ApplicationsList /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
    { name: "Add New Animal", element: <AddNewAnimal /> },
    { name: "Pet Blog", element: <PetBlog /> },
    { name: "Guide", element: <GuidePage /> },
    { name: "Animal List", element: <AnimalList /> },
  ];

  let cardHeadersVeterinarian = [
    ,
    { name: "Upload Health Records", element: <UploadHealthRecord /> },
    { name: "Appointments", element: <AppointmentList /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Profile", element: <Profile role={role} /> },
    { name: "Pet Blog", element: <PetBlog /> },
    { name: "Animal List", element: <VetAnimalList /> },
    { name: "Guide", element: <GuidePage /> },
  ];

  let cardHeadersAdmin = [
    ,
    { name: "Adoption Application", element: <AdoptionApplicationsAdmin /> },
    { name: "Verification Operations", element: <VerificationRequests /> },
    { name: "Profile", element: <Profile role={role} /> },
    { name: "Messages", element: <MessagePage /> },
    { name: "Pet Blog", element: <PetBlog /> },
    { name: "Guide", element: <GuidePage /> },
    { name: "System Records", element: <SystemRecords /> }
  ];

  useEffect(() => {
    switch (role) {
      case "user":
      case "field_expert":
        setCards(cardHeadersUser);
        break;
      case "veterinarian":
        setCards(cardHeadersVeterinarian);
        break;
      case "admin":
        setCards(cardHeadersAdmin);
        break;
      case "animal_shelter":
        setCards(cardHeadersShelter);
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
          <img
            src={getProfile(userDetails.user_id)}
            style={{ width: "300px", borderRadius: "50%" }}
          />
          <span className="badge rounded-pill bg-primary">
            {role.toUpperCase().replace("_", " ")}
          </span>
        </div>
      </div>
    </>
  );
}

export default MenuCards;
