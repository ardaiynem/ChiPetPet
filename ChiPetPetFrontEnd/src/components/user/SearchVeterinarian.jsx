import { Card, Button, Dropdown, Modal, Form } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../../contexts/panelContext";
import { getAllVeterinarians, getPetsByAdopterId, createAppointment, getVeterinarianAppointmentDates } from "../../apiHelper/backendHelper";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";

function SearchVeterinarian() {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [existingAppointments, setExistingAppointments] = useState([]);
  const [appointmentText, setAppointmentText] = useState("");
  
  const { userDetails } = useAuth();
  const { setTimedAlert } = useAlert();

  const [userPets, setUserPets] = useState([]);
  const [selectedPetApt, setSelectedPetApt] = useState(null);


  const [selectedTime, setSelectedTime] = useState("09:00");

  const [selectedDate, setDate] = useState("2023-01-01");

  const [sortOption, setSortOption] = useState("None");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [expertise, setExpertise] = useState("");

  const [message, setMessage] = useState("");
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

  useEffect(() => {
    getPetsByAdopterId(userDetails.user_id)
      .then((res) => {
        setUserPets(res.data.pets);
      })
      .catch((err) => {
        setTimedAlert("Error getting pets", "error", 3000);
      });
  }, []);

  const getExistingAppointments = (user_id) => {
    getVeterinarianAppointmentDates(user_id)
      .then((res) => {
        const converted = res.data.appointments?.map((appointment) => {
          const [dateTime] = appointment;
          let [date, time] = dateTime.split("T");
          time = time.substring(0, 3) + "00";
          return { date, time };
        });

        setExistingAppointments(converted);

        console.log("converted", converted);
      })
      .catch((err) => {
        setTimedAlert("Error getting appointments", "error", 3000);
      });
  };
    

  const handleMakeAppointment = () => {

    if (!selectedPetApt) {
      setTimedAlert("Please select a pet", "error", 3000);
      return;
    }

    // create date and time string
    const formattedDate = `${selectedDate} ${selectedTime}`;
    console.log("formattedDate", formattedDate);
    
    const data = {
      "date_and_time": formattedDate,
      "location": selectedVet.address,
      "appointment_text": appointmentText,
      "user_id": userDetails.user_id,
      "veterinarian_id": selectedVet.user_id,
      "pet_id": selectedPetApt.pet_id
    }

    createAppointment(data)
      .then((res) => {
        setTimedAlert("Appointment created", "success", 3000);
      })
      .catch((err) => {
        setTimedAlert("Error creating appointment", "error", 3000);
      });

    setShowModal(false);
  };

  const handleContact = () => {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log("Selected vet", selectedVet);
    axios
      .post("http://127.0.0.1:8000/message/send", {
        user_id: userDetails.user_id,
        date_and_time: formattedDate,
        receiver_id: selectedVet.user_id,
        content: message,
      })
      .then((res) => {
        setShowModalMsg(false);
        setMessage("");
        setTimedAlert("Message successfully sent", "success", 3000);
      });
  };

  const renderTimeOptions = () => {
    const timeOptions = [];

    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;

        // Assuming selectedDate is the current selected date
        const isUnavailable = existingAppointments.some(
          (appointment) =>
            appointment.date === selectedDate &&
            appointment.time === formattedTime
        );

        timeOptions.push(
          <option
            key={formattedTime}
            value={formattedTime}
            disabled={isUnavailable}
            style={{ color: isUnavailable ? "red" : "black" }}
          >
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
        <div
          className=""
          style={{ flex: "1 1 0" }}
          onClick={() => setSelectedVet(null)}
        >
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
                <tr
                  key={vet.user_id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVet(vet);
                    getExistingAppointments(vet.user_id);
                  }}
                >
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
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => setShowModalMsg(true)}
                >
                  Contact
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
          <div class="mb-3 mt-3">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {
                  selectedPetApt ? selectedPetApt.pet_name : "Select Pet"
                }
              </Dropdown.Toggle>

              {
                userPets &&

                <Dropdown.Menu>
                  {userPets.map((pet) => (
                    <Dropdown.Item onClick={() => setSelectedPetApt(pet)}>{pet.pet_name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>

              }
            </Dropdown>

          </div>
          <Form.Group controlId="appointmentTime">
            <Form.Label>Select Time:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedTime(e.target.value)}
              value={selectedTime}
            >
              <option value="" disabled>
                Select a time
              </option>
              {renderTimeOptions()}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="appointmentText">
            <Form.Label>Additional Information:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter additional information..."
              value={appointmentText}
              onChange={(e) => setAppointmentText(e.target.value)}
            />
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

      {/* Modal for contacting */}
      <Modal show={showModalMsg} onHide={() => setShowModalMsg(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Message to {selectedVet?.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Type your message here"
              id="floatingTextarea2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ height: "200px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Your message here</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setMessage("");
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleContact}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchVeterinarian;
