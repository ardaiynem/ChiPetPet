import { PanelContext } from "../../contexts/panelContext";
import { useState, useContext } from "react";
import { Button, Dropdown, FormControl, Modal, ModalBody, Row, Col, Form } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import HealthRecords from "../healthRecords";
import { insertPetsFromExcel } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";

function AnimalList() {
  const { userDetails } = useAuth();
  const { setTimedAlert } = useAlert();

  // for uploading excel file
  const [excelFile, setExcelFile] = useState(null);
  const handleFileChange = (e) => {
    setExcelFile(e.target.files[0]);
  };
  const handleExcelFileSubmit = () => {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("shelter_id", userDetails.user_id);
    formData.append("excel_file", excelFile);

    console.log(excelFile)
    insertPetsFromExcel(formData)
      .then((res) => {
        console.log(res.data); 
        setTimedAlert("Excel file uploaded successfully", "success", 3000);
      })
      .catch((err) => {
        console.log(err);
        setTimedAlert("Error uploading excel file", "error", 3000);
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    species: "Cat",
    breed: "",
    gender: "",
    age: 1,
    healthStatus: "Healthy",
    adoptionStatus: "WAITING",
    description: "",
    photo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
      return;
    }

    /* reader.readAsText(e.target.files[0]); */
    setFormData({ ...formData, [name]: value });
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExcellModal, setExcellModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const animalData = [
    { name: "Tüylü Laik", species: "Dog", Adoption: "Not Adopted", age: 3, breed: "Labrador", gender: "Male" },
    { name: "El Gato", species: "Cat", Adoption: "Not Adopted", age: 2, breed: "Siamese", gender: "Female" },
    { name: "Papağan Papağanoğlu", species: "Parrot", Adoption: "Adoption Pending", age: 1, breed: "Ara", gender: "Unknown" },
];



  const handleRowClick = (index) => {
    const clickedRow = animalData[index];
    setSelectedAnimal(clickedRow);
  };

  return (
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
          <div className="d-flex flex-column gap-2 mt-3" style={{alignItems: "center"}}>
            <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "250px" }} onClick={() => setExcellModal(true)}>
              Add Excell Sheet
            </button>
          </div>
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
                <div className="d-flex">
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-danger" type="button" style={{ backgroundColor: "red", borderColor: "red", color: "white", maxWidth: "170px" }} onClick={() => setShowModal(true)}>
                      Delete Pet
                    </button>
                    <button className="btn btn-success" type="button" style={{ backgroundColor: "green", borderColor: "green", color: "white", maxWidth: "170px" }} onClick={() => setShowEditModal(true)}>
                      Edit Pet Information
                    </button>
                  </div>

                  <div className="d-flex flex-column gap-2" style={{ marginLeft: "170px" }}>
                    <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", maxWidth: "230px" }} onClick={()=> setCurrentPanel(<HealthRecords petid = {1} petname = {"pet.name"}/>)}>
                      See Health Record
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Delete Pet</Modal.Title>
          </Modal.Header>
        <ModalBody>
          <div>
            <p>Are you sure you want to delete ?</p>
          </div>
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Delete
          </Button>
        </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
            <Modal.Title>Edit Pet</Modal.Title>
          </Modal.Header>
            <ModalBody>
            <div className="p-4">
      <Form>
        <Row className="mb-3">
          <Col>
            <label className="form-label" htmlFor="customFile">
              Upload Image
            </label>
            <input
              type="file"
              name="photo"
              onChange={handleInputChange}
              className="form-control"
              id="customFile"
            />
          </Col>

          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSpecies">
              <Form.Label>Species</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  className="border border-primary"
                  variant="success"
                  id="dropdown-basic"
                >
                  {formData.species}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Cat" });
                    }}
                  >
                    Cat
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Dog" });
                    }}
                  >
                    Dog
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Bird" });
                    }}
                  >
                    Bird
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Rabbits" });
                    }}
                  >
                    Rabbit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Small & Furry" });
                    }}
                  >
                    Small & Furry
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, species: "Others" });
                    }}
                  >
                    Others
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter breed"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formAge">
              <Form.Label>Age in months</Form.Label>
              <Form.Control
                type="number"
                min="1"
                step="1"
                placeholder="Enter age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Health Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  className="border border-primary"
                  variant="success"
                  id="dropdown-basic"
                >
                  {formData.healthStatus}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, healthStatus: "HEALTHY" });
                    }}
                  >
                    Healthy
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, healthStatus: "ILL" });
                    }}
                  >
                    ILL
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Adoption Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  className="border border-primary"
                  variant="success"
                  id="dropdown-basic"
                >
                  {formData.adoptionStatus}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, adoptionStatus: "WAITING" });
                    }}
                  >
                    WAITING
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setFormData({ ...formData, adoptionStatus: "ADOPTED" });
                    }}
                  >
                    ADOPTED
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => setShowEditModal(false)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showExcellModal} onHide={() => setExcellModal(false)}>
          <Modal.Header>
            <Modal.Title>Insert Excell File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Select an excell file</p>
          <input
              type="file"
              onChange={handleFileChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setExcellModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleExcelFileSubmit}>
              Submit
            </Button>
          </Modal.Footer>
      </Modal>

      </div>
    </div>
  );
}

export default AnimalList;
