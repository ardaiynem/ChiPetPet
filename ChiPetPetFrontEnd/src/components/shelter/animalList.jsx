import { PanelContext } from "../../contexts/panelContext";
import { useState, useContext, useEffect } from "react";
import {
  Button,
  Dropdown,
  FormControl,
  Modal,
  ModalBody,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import emptyImg from "../../assets/empty.png";
import HealthRecords from "../healthRecords";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import { insertPetsFromExcel } from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";

function AnimalList() {
  const { userDetails } = useAuth();

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState({
    min: 0,
    max: 1200,
  });
  const [sortOption, setSortOption] = useState("None");

  const [pets, setPets] = useState([]);

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

    console.log(excelFile);
    insertPetsFromExcel(formData)
      .then((res) => {
        console.log(res.data);
        setTimedAlert("Excel file uploaded successfully", "success", 3000);
        setExcellModal(false);
      })
      .catch((err) => {
        console.log(err);
        setTimedAlert("Error uploading excel file", "error", 3000);
      });
  };

  const handleEditSubmit = () => {
    const data = new FormData();
    data.append("photo", selectedAnimal.photo);
    data.append("shelter_id", userDetails.user_id);

    Object.keys(selectedAnimal).forEach((key) => {
      if (key !== "photo") {
        data.append(key, selectedAnimal[key]);
      }
    });

    console.log(data.get("shelter_id"));

    axios
      .post("http://127.0.0.1:8000/pet_create/update_pet/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setPets([
          ...pets.filter((p) => p.pet_id !== selectedAnimal.pet_id),
          selectedAnimal,
        ]);
        setTimedAlert("Animal saved successfully", "success", 3000);
      });

    console.log("Submit the edited here and trigger useEffect");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      selectedAnimal({ ...selectedAnimal, photo: e.target.files[0] });
      return;
    }

    setSelectedAnimal({ ...selectedAnimal, [name]: value });
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showExcellModal, setExcellModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  const getAnimals = () => {
    axios
      .get(
        "http://127.0.0.1:8000/pet_create/get_pets_by_shelter_with_attributes/",
        {
          params: {
            name: name,
            breed: breed,
            species: species,
            sortOption: sortOption,
            user_id: userDetails.user_id,
            max_age: age.max,
            min_age: age.min,
          },
        }
      )
      .then((res) => {
        console.log("With shelter", res.data);
        setPets(res.data.pets);
      })
      .catch((err) => {
        setTimedAlert("Error retrieving animals", "error", 3000);
      });
  };

  useEffect(() => {
    getAnimals();
  }, [name, breed, sortOption, species, showExcellModal, age]);

  const deletePetHandle = () => {
    console.log(pets);
    console.log(selectedAnimal);
    axios
      .delete("http://127.0.0.1:8000/pet_create/delete_pet/", {
        params: {
          pet_id: selectedAnimal.pet_id,
        },
      })
      .then((res) => {
        setPets(pets.filter((p) => selectedAnimal.pet_id !== p.pet_id));
        setSelectedAnimal(null);
        getAnimals();
      })
      .catch((err) => {
        setTimedAlert("Error deleting animal", "error", 3000);
      });
  };

  const handleRowClick = (index) => {
    const clickedRow = pets[index];
    setSelectedAnimal(clickedRow);
  };

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-2 start-2"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>

      <div className="d-flex">
        <div className="" style={{ flex: "1 1 0" }}>
          <div className="d-flex justify-content-between mb-5 mt-4">
            <FormControl
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="mr-sm-2"
              style={{ width: "150px", marginLeft:"15px" }}
            />

            <FormControl
              type="text"
              value={breed}
              placeholder="Breed"
              onChange={(e) => setBreed(e.target.value)}
              className="mr-sm-2"
              style={{ width: "150px", marginLeft:"15px" }}
            />

            <label style={{ marginLeft: "15px" }}> Min Age (Months): </label>
            <FormControl
              type="number"
              value={age.min}
              min={0}
              max={age.max - 1}
              placeholder="Min Age(Months): "
              onChange={(e) =>
                setAge({
                  min: e.target.value,
                  max: age.max,
                })
              }
              className="mr-sm-2"
              style={{ width: "100px", marginLeft: "5px" }}
            />

            <label style={{ marginLeft: "15px" }}> Max Age (Months): </label>
            <FormControl
              type="number"
              value={age.max}
              placeholder="Max Age(Months): "
              onChange={(e) =>
                setAge({
                  min: age.min,
                  max: e.target.value,
                })
              }
              min={age.min + 1}
              max={1200}
              className="mr-sm-2"
              style={{ width: "100px", marginLeft: "5px" }}
            />

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft: "15px" }}>
                Sort By {sortOption === "None" ? "" : sortOption}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOption("name")}>
                  {"Adoption Status (A-Z)"}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption("breed")}>
                  {"Breed (A-Z)"}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOption("adoption_status")}>
                  {"Adoption Status (A-Z)"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft: "15px" }}>
                Species {species === "" ? "" : ": " + species.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSpecies("")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("cat")}>
                  Cat
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("dog")}>
                  Dog
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("bird")}>
                  Bird
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("rabbit")}>
                  Rabbit
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("small&furry")}>
                  Small & Furry
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSpecies("others")}>
                  Others
                </Dropdown.Item>
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
              {pets.map((pet, index) => (
                <tr key={index} onClick={() => handleRowClick(index)}>
                  <td>{pet.name}</td>
                  <td>{pet.species}</td>
                  <td>{pet.adoption_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="d-flex flex-column gap-2 mt-3"
            style={{ alignItems: "center" }}
          >
            <button
              className="btn btn-primary"
              type="button"
              style={{
                backgroundColor: "blue",
                borderColor: "blue",
                color: "white",
                maxWidth: "250px",
              }}
              onClick={() => setExcellModal(true)}
            >
              Add Excell Sheet
            </button>
          </div>
        </div>

        <div
          className="d-flex justify-content-end"
          style={{ flex: "1 1 0", marginRight: "50px" }}
        >
          {selectedAnimal && (
            <div className="card" style={{ width: "600px" }}>
              <div className="d-flex p-3 justify-content-center">
                <img
                  src={
                    selectedAnimal.photo === null
                      ? emptyImg
                      : `data:image/png;base64, ${selectedAnimal.photo}`
                  }
                  className="card-img-top"
                  alt="Cat"
                  style={{ width: "200px", marginRight: "50px" }}
                />
                <h5
                  className="card-title"
                  style={{ marginRight: "50px", marginBottom: "10px" }}
                >
                  {selectedAnimal.name}
                </h5>
                <table
                  className="table table-striped"
                  style={{ width: "100px" }}
                >
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
                      <th scope="row">Age in months</th>
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
                <p className="card-text">{selectedAnimal.description}</p>
                <div className="d-flex">
                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-danger"
                      type="button"
                      style={{
                        backgroundColor: "red",
                        borderColor: "red",
                        color: "white",
                        maxWidth: "170px",
                      }}
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Delete Pet
                    </button>
                    <button
                      className="btn btn-success"
                      type="button"
                      style={{
                        backgroundColor: "green",
                        borderColor: "green",
                        color: "white",
                        maxWidth: "170px",
                      }}
                      onClick={() => {
                        setShowEditModal(true);
                      }}
                    >
                      Edit Pet Information
                    </button>
                  </div>

                  <div
                    className="d-flex flex-column gap-2"
                    style={{ marginLeft: "170px" }}
                  >
                    <button
                      className="btn btn-primary"
                      type="button"
                      style={{
                        backgroundColor: "blue",
                        borderColor: "blue",
                        color: "white",
                        maxWidth: "230px",
                      }}
                      onClick={() =>
                        setCurrentPanel(
                          <HealthRecords petid={1} petname={"pet.name"} />
                        )
                      }
                    >
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
            <Button
              variant="danger"
              onClick={() => {
                setShowModal(false);
                deletePetHandle();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {showEditModal && (
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
                        value={selectedAnimal.photo}
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
                          value={selectedAnimal.name}
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
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {selectedAnimal.species}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  species: "Cat",
                                });
                              }}
                            >
                              Cat
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  species: "Dog",
                                });
                              }}
                            >
                              Dog
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  species: "Bird",
                                });
                              }}
                            >
                              Bird
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  species: "Rabbits",
                                });
                              }}
                            >
                              Rabbit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  species: "Small & Furry",
                                });
                              }}
                            >
                              Small & Furry
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelected({
                                  ...selectedAnimal,
                                  species: "Others",
                                });
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
                          value={selectedAnimal.breed}
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
                          value={selectedAnimal.gender}
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
                          max="1200"
                          step="1"
                          placeholder="Enter age"
                          name="age"
                          value={selectedAnimal.age}
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
                          value={selectedAnimal.description}
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
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {selectedAnimal.health_status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  health_status: "HEALTHY",
                                });
                              }}
                            >
                              Healthy
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  health_status: "ILL",
                                });
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
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            {selectedAnimal.adoption_status}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  adoptionStatus: "WAITING",
                                });
                              }}
                            >
                              WAITING
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedAnimal({
                                  ...selectedAnimal,
                                  adoptionStatus: "ADOPTED",
                                });
                              }}
                            >
                              ADOPTED
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </div>
            </ModalBody>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedAnimal(null);
                  setShowEditModal(false);
                }}
              >
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  console.log("clicking");
                  handleEditSubmit();
                  setSelectedAnimal(null);
                  setShowEditModal(false);
                }}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <Modal show={showExcellModal} onHide={() => setExcellModal(false)}>
          <Modal.Header>
            <Modal.Title>Insert Excell File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Select an excell file</p>
            <input type="file" onChange={handleFileChange} />
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
