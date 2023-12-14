import { Container, Navbar, Button, Row, Stack } from "react-bootstrap";
import MenuCards from "../components/MenuCards";
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
import { PanelContext } from "../contexts/panelContext";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import LoginPage from "./LoginPage";
import Alert from "../components/UI/Alert";

function MainPage() {
  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const [currentPanel, setPanel] = useState(<MenuCards />);

  const setCurrentPanel = (reactElement) => {
    if (reactElement == "back") {
      setPanel(<MenuCards />);
    } else {
      setPanel(reactElement);
    }
  };

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem("userDetails") !== null) {
      console.log(localStorage.getItem("userDetails"));
      login(JSON.parse(localStorage.getItem("userDetails")));
    }
  });

  return (
    <>
    <Alert />
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <Container fluid className="h-100 p-0">
          <Stack gap={0} className="h-100">
            <Navbar expand="lg" bg="primary" className="flex-grow-0">
              <Container>
                <Navbar.Brand href="#">ChiPetPet</Navbar.Brand>
                <div className="d-flex justify-content-end mb-2">
                  <style>
                    {`

                        .btn-dark:hover {
                        background-color: black;
                        color: rgb(240, 8, 124);
                        }
                    `}
                  </style>

                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="btn btn-dark rounded ml-2"
                    style={{ fontSize: "18px" }}
                  >
                    Logout {isAuthenticated}
                  </button>
                </div>
              </Container>
            </Navbar>
            <div className="p-0 flex-grow-1">
              <Stack
                gap={0}
                direction="horizontal"
                className="h-100 d-flex justify-content-center"
              >
                <PanelContext.Provider
                  value={{ currentPanel, setCurrentPanel }}
                >
                  {currentPanel}
                </PanelContext.Provider>
              </Stack>
            </div>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default MainPage;
