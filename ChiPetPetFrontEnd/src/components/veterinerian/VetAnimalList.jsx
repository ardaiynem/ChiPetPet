import { PanelContext } from "../../contexts/panelContext";
import { useState, useContext } from "react";
import { Button, Dropdown, FormControl, Modal, ModalBody, Row, Col, Form } from 'react-bootstrap';
import HealthRecords from "../healthRecords";
import catImg from "../../assets/cat1.jpeg";
import UploadHealthRecord from "./uploadPage";

function VetAnimalList(){
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    
    const handleRowClick = (index) => {
        const clickedRow = animalData[index];
        setSelectedAnimal(clickedRow);
      };

    const animalData = [
        { name: "Tüylü Laik", species: "Dog", Adoption: "Not Adopted", age: 3, breed: "Labrador", gender: "Male" },
        { name: "El Gato", species: "Cat", Adoption: "Not Adopted", age: 2, breed: "Siamese", gender: "Female" },
        { name: "Papağan Papağanoğlu", species: "Parrot", Adoption: "Adoption Pending", age: 1, breed: "Ara", gender: "Unknown" },
    ];

    return(
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>
            <div className="d-flex">
        <div className="" style={{ flex: "1 1 0" }}>
          <div className="d-flex justify-content-between mb-5 mt-4">
            <FormControl
              type="text"
              placeholder="Search..."
              className="mr-sm-2"
              style={{ maxWidth: "400px" }}
            />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Type
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Species</th>
                <th scope="col">Adoption Status</th>
              </tr>
            </thead>
            <tbody>
            {animalData.map((animal, index) => (
                <tr key={index} onClick={() => handleRowClick(index)}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.Adoption}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="d-flex justify-content-end" style={{ flex: "1 1 0", marginRight: "50px" }}>
          {selectedAnimal && (
            <div className="card" style={{ width: "600px" }}>
              <div className="d-flex p-3 justify-content-center">
                <img src={catImg} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "50px" }} />
                <h5 className="card-title" style={{ marginRight: "50px", marginBottom: "10px" }}>{selectedAnimal.name}</h5>
                <table className="table table-striped" style={{ width: "100px" }}>
                  <tbody>
                    <tr>
                      <th scope="row">Species</th>
                      <td>{selectedAnimal.species}</td>
                    </tr>
                    <tr>
                      <th scope="row">Breed</th>
                      <td>{selectedAnimal.breed}</td>
                    </tr>
                    <tr>
                      <th scope="row">Age</th>
                      <td>{selectedAnimal.age}</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{selectedAnimal.gender}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <div className="d-flex flex-column gap-2" style={{ marginLeft: "170px" }}>
                    <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "230px" }} onClick={()=> setCurrentPanel(<HealthRecords petid = {1} petname = {"pet.name"}/>)}>
                      See Health Records
                    </button>
                    <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "230px" }} onClick={()=> setCurrentPanel(<UploadHealthRecord petid = {1}/>)}>
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