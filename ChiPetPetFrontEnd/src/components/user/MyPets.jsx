import { Card, Button, Dropdown, Modal, Form, Row, Col } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getPetsByAdopterId } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import emptyImg from "../../assets/empty.png";
import axios from "axios";

function MyPets() {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [pets, setPets] = useState([]);

  const { userDetails } = useAuth();
  const { setTimedAlert } = useAlert();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    console.log("working");
    getPetsByAdopterId(userDetails.user_id)
      .then((res) => {
        console.log(res.data.pets);
        setPets(res.data.pets);
      })
      .catch((err) => {
        setTimedAlert("Error getting pets", "error", 3000);
      });
  }, [updated]);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedPet, setSelectedPet] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      setSelectedPet({ ...selectedPet, photo: e.target.files[0] });
      return;
    }
    setSelectedPet({ ...selectedPet, [name]: value });
  };

  const handleEditSubmit = () => {
    const data = new FormData();
    console.log("photo", selectedPet.photo);
    data.append("shelter_id", userDetails.user_id);

    Object.keys(selectedPet).forEach((key) => {
      if (key !== "pet_name") {
        data.append(key, selectedPet[key]);
      } else {
        data.append("name", selectedPet[key]);
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
          ...pets.filter((p) => p.pet_id !== selectedPet.pet_id),
          selectedPet,
        ]);
        setUpdated(!updated);
        setTimedAlert("Animal saved successfully", "success", 3000);
      });
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
          <div className="d-flex justify-content-between mb-5"></div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Species</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr
                  onClick={() => {
                    setSelectedPet(pet);
                  }}
                >
                  <th scope="row">{pet.pet_id}</th>
                  <td>{pet.pet_name}</td>
                  <td>{pet.species}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-end" style={{ flex: "1 1 0" }}>
          <div
            className="card"
            style={{
              width: "600px",
              visibility: selectedPet ? "visible" : "hidden",
            }}
          >
            <div className="d-flex p-3 gap-3 justify-content-between">
              <img
                src={
                  selectedPet?.photo === null
                    ? emptyImg
                    : `data:image/png;base64, ${selectedPet?.photo}`
                }
                className="card-img-top"
                style={{ width: "300px" }}
              />
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row">Species</th>
                    <td>{selectedPet?.species}</td>
                  </tr>
                  <tr>
                    <th scope="row">Breed</th>
                    <td>{selectedPet?.breed}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{selectedPet?.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">Age</th>
                    <td>{selectedPet?.age}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-body">
              <h5 className="card-title">{selectedPet?.pet_name}</h5>
              <p className="card-text">{selectedPet?.description}</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                        name="pet_name"
                        value={selectedPet?.pet_name}
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
                          {selectedPet?.species}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "cat",
                              });
                            }}
                          >
                            Cat
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "dog",
                              });
                            }}
                          >
                            Dog
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "bird",
                              });
                            }}
                          >
                            Bird
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "rabbit",
                              });
                            }}
                          >
                            Rabbit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "small & furry",
                              });
                            }}
                          >
                            Small & Furry
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                species: "others",
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
                        value={selectedPet?.breed}
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
                        value={selectedPet?.gender}
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
                        value={selectedPet?.age}
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
                        value={selectedPet?.description}
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
                          {selectedPet?.health_status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                health_status: "HEALTHY",
                              });
                            }}
                          >
                            HEALTHY
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                health_status: "UNHEALTHY",
                              });
                            }}
                          >
                            UNHEALTHY
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
                          {selectedPet?.adoption_status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                adoption_status: "WAITING",
                              });
                            }}
                          >
                            WAITING
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setSelectedPet({
                                ...selectedPet,
                                adoption_status: "ADOPTED",
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedPet(null);
                setShowEditModal(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                handleEditSubmit();
                setSelectedPet(null);
                setShowEditModal(false);
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default MyPets;
