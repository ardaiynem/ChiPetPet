import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

function AddNewAnimal() {
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    species: '',
    breed: '',
    gender: '',
    age: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada formun gönderilmesi veya işlenmesi işlemleri gerçekleştirilebilir.
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-4">
        <Button className="position-relative top-2 start-2">
            Back
        </Button>
      <h1>Add Animal</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <label class="form-label" for="customFile">Upload Image</label>
            <input type="file" class="form-control" id="customFile" />
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
              <Form.Control
                type="text"
                placeholder="Enter species"
                name="species"
                value={formData.species}
                onChange={handleInputChange}
              />
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddNewAnimal;
