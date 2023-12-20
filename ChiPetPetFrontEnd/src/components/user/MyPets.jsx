import { Card, Button, Dropdown, Modal, Form, Row, Col } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getPetsByAdopterId } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import emptyImg from "../../assets/empty.png";

function MyPets() {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);
    const [pets, setPets] = useState([]);

    const { userDetails } = useAuth();
    const { setTimedAlert } = useAlert();

    useEffect(() => {
        getPetsByAdopterId(userDetails.user_id)
            .then((res) => {
                console.log(res.data.pets);
                setPets(res.data.pets);
            })
            .catch((err) => {
                setTimedAlert("Error getting pets", "error", 3000);
            });
    }, []);

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

    return (
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>

            <div className="d-flex">
                <div className="" style={{ flex: "1 1 0" }}>
                    <div className="d-flex justify-content-between mb-5">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
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
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Species</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pets.map((pet) => (
                                    <tr onClick={() => { setSelectedPet(pet) }}>
                                        <th scope="row">{pet.pet_id}</th>
                                        <td>{pet.pet_name}</td>
                                        <td>{pet.species}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-end" style={{ flex: "1 1 0" }}>
                    <div className="card" style={{ width: "600px", visibility: selectedPet ? "visible" : "hidden" }}>
                        <div className="d-flex p-3 gap-3 justify-content-between">
<<<<<<< HEAD
                            <img src={selectedPet?.photo === null
                        ? emptyImg
                        : `data:image/png;base64, ${selectedPet?.photo}`} className="card-img-top" style={{width:"300px"}}/>
=======
                            <img src={ selectedPet?.photo === null
                                ? emptyImg
                                : `data:image/png;base64, ${selectedPet?.photo}`} className="card-img-top" style={{width:"300px"}}/>
>>>>>>> 2cebbb38b92a48defaa322cfa638d1161cb2ac19
                            <table className="table table-striped" >
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
                                <button className="btn btn-primary" type="button" onClick={() => {
                        setShowEditModal(true);
                      }}>Edit</button>
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
                          name="name"
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
                  console.log("clicking");
                  setSelectedPet(null);
                  setShowEditModal(false);
                }}
              >
                Submit
              </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>)
}

export default MyPets;