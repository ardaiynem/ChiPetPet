import { PanelContext } from "../../contexts/panelContext";
import { useState, useContext, useEffect } from "react";
import { Button, Dropdown, FormControl, Modal, ModalBody, Row, Col, Form } from 'react-bootstrap';
import HealthRecords from "../healthRecords";
import catImg from "../../assets/cat1.jpeg";
import UploadHealthRecord from "./uploadPage";
import { getPetsByVeterinarian } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import emptyImg from "../../assets/empty.png";

function VetAnimalList(){
  const { setTimedAlert } = useAlert();
  const { userDetails } = useAuth();

    const { currentPanel, setCurrentPanel } = useContext(PanelContext);

    const [animalData, setAnimalData] = useState([]);

    useEffect(() => {
      getPetsByVeterinarian(userDetails.user_id)
        .then((res) => {
          setAnimalData(res.data.pets);
          console.log(res.data.pets);
        })
        .catch((err) => {
          setTimedAlert("Error retrieving animals", "error", 3000);
        });
    }, []);

    const [selectedAnimal, setSelectedAnimal] = useState(null);
    
    const handleRowClick = (index) => {
        const clickedRow = animalData[index];
        setSelectedAnimal(clickedRow);
      };



    return(
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>
            <div className="d-flex">
        <div className="" style={{ flex: "1 1 0" }}>
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Species</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
            {animalData.map((animal, index) => (
                <tr key={index} onClick={() => handleRowClick(index)}>
                  <td>{animal.name}</td>
                  <td>{animal.species.toUpperCase()}</td>
                  <td>{animal.date_and_time.replace("T", " ").slice(0, -3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="d-flex justify-content-end" style={{ flex: "1 1 0", marginRight: "50px" }}>
          {selectedAnimal && (
            <div className="card" style={{ width: "600px" }}>
              <div className="d-flex p-3 justify-content-center">
                <img src={selectedAnimal?.photo === null
                      ? emptyImg
                      : `data:image/png;base64, ${selectedAnimal.photo}`} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "50px" }} />
                <h5 className="card-title" style={{ marginRight: "50px", marginBottom: "10px" }}>{selectedAnimal.name}</h5>
                <table className="table table-striped" style={{ width: "100px" }}>
                  <tbody>
                    <tr>
                      <th scope="row">Species</th>
                      <td>{selectedAnimal?.species}</td>
                    </tr>
                    <tr>
                      <th scope="row">Breed</th>
                      <td>{selectedAnimal?.breed}</td>
                    </tr>
                    <tr>
                      <th scope="row">Age</th>
                      <td>{selectedAnimal?.age}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{selectedAnimal?.gender}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <p className="card-text">{selectedAnimal?.description}</p>
                  <div className="d-flex flex-column gap-2" style={{ marginLeft: "170px" }}>
                    <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "230px" }} onClick={()=> setCurrentPanel(<HealthRecords petid = {selectedAnimal?.pet_id} petname = {selectedAnimal?.name}/>)}>
                      See Health Records
                    </button>
                    <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "230px" }} onClick={()=> setCurrentPanel(<UploadHealthRecord petid = {selectedAnimal?.pet_id}/>)}>
                      Upload Health Record
                    </button>
                  </div>
                </div>
              </div>
          )}
          </div>
        </div>
        </div>
    );
}

export default VetAnimalList;