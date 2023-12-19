import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Pagination,
  Dropdown,
  Stack,
} from "react-bootstrap";

import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import { PanelContext } from "../../contexts/panelContext";
import { useAlert } from "../../AlertContext";

function AddNewAnimal() {
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

  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const { setTimedAlert } = useAlert();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
      return;
    }

    /* reader.readAsText(e.target.files[0]); */
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("photo", formData.photo);
    data.append("shelter_id", userDetails.user_id);

    Object.keys(formData).forEach((key) => {
      if (key !== "photo") {
        data.append(key, formData[key]);
      }
    });

    console.log(data.get("shelter_id"));

    axios
      .post("http://127.0.0.1:8000/pet_create/insert_pet/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setTimedAlert("Animal added successfully", "success", 3000);
        setCurrentPanel("back");
      });
  };

  return (
    <div className="p-4">
      <Button
        onClick={() => setCurrentPanel("back")}
        className="position-relative top-2 start-2"
      >
        Back
      </Button>
      <h1>Add Animal</h1>
      <Form onSubmit={handleSubmit}>
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
  );
}

export default AddNewAnimal;
