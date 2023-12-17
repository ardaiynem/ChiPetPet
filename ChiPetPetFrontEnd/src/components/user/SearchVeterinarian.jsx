import { Card, Button, Dropdown, Modal, Form } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../../contexts/panelContext";
import { getAllVeterinarians } from "../../apiHelper/backendHelper";
import axios from "axios";

function SearchVeterinarian() {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedDate, setDate] = useState("2023-01-01");

  const [sortOption, setSortOption] = useState("None");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [expertise, setExpertise] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:8000/login_register/get_all_veterinarians_with_attributes/",
        {
          params: {
            username: name,
            address: address,
            expertise: expertise,
            sortOption: sortOption,
          },
        }
      )
      .then((res) => {
        setVeterinarians(res.data.veterinarians);
      });
  }, [name, address, expertise, sortOption]);

  const handleMakeAppointment = () => {
    // Handle the logic for making an appointment here
    // For now, just close the modal
    setShowModal(false);
  };

  const renderTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        timeOptions.push(
          <option key={formattedTime} value={formattedTime}>
            {formattedTime}
          </option>
        );
      }
    }
    return timeOptions;
  };

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button
        className="position-relative top-2 start-2 m-1"
        onClick={() => setCurrentPanel("back")}
      >
        Back
      </Button>
      <div className="d-flex">
        <div className="" style={{ flex: "1 1 0" }}>
          <div className="d-flex align-items-center mb-5">
            <div className="d-flex mt-1">
              <input
                style={{ marginLeft: "5px" }}
                className="form-control"
                placeholder={name === "" ? "Name" : ""}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                style={{ marginLeft: "5px" }}
                className="form-control"
                placeholder={address === "" ? "Address" : ""}
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <input
                style={{ marginLeft: "5px" }}
                className="form-control"
                placeholder={expertise === "" ? "Expertise" : ""}
                type="text"
                value={expertise}
                onChange={(e) => {
                  setExpertise(e.target.value);
                }}
              />
            </div>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By{" "}
                {sortOption === "None"
                  ? ""
                  : sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setSortOption("username");
                  }}
                >
                  {"Name(A-Z)"}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSortOption("address");
                  }}
                >
                  {"Address(A-Z)"}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setSortOption("expertise");
                  }}
                >
                  {"Expertise(A-Z)"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Expertise</th>
              </tr>
            </thead>
            <tbody>
              {veterinarians.map((vet) => (
                <tr key={vet.user_id} onClick={() => setSelectedVet(vet)}>
                  <th scope="row">{vet.username}</th>
                  <td>{vet.address}</td>
                  <td>{vet.expertise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end" style={{ flex: "1 1 0" }}>
          <div
            className="card"
            style={{
              width: "400px",
              visibility: selectedVet ? "visible" : "hidden",
            }}
          >
            <div className="d-flex p-3 justify-content-center">
              <img src={catImg} className="card-img-top" alt="Veterinarian" />
            </div>
            <div className="card-body">
              <h5 className="card-title">{selectedVet?.username}</h5>
              <p className="card-text">
                You can contact me via {selectedVet?.contact}.
              </p>
              <div className="d-grid gap-2">
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Make Appointment
                </Button>
                <Button className="btn btn-primary" type="button">
                  Another Button
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for making appointment */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={selectedDate}
          />
          <Form.Group controlId="appointmentTime">
            <Form.Label>Select Time:</Form.Label>
            <Form.Control
              as="select"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="" disabled>
                Select a time
              </option>
              {renderTimeOptions()}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMakeAppointment}>
            Make Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchVeterinarian;
