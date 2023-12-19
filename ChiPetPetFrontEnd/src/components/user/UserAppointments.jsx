import { Button, Dropdown, FormControl, Modal, Form } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getAppointmentByUser } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";

function UserAppointments() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const { setTimedAlert } = useAlert();
  const { userDetails } = useAuth();

  const [selectedVet, setSelectedVet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [appointmentText, setAppointmentText] = useState("");
  const [existingAppointments, setExistingAppointments] = useState([]);

  const [userPets, setUserPets] = useState([]);
  const [selectedPetApt, setSelectedPetApt] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedDate, setDate] = useState("2023-01-01");


  const [message, setMessage] = useState("");

  const toggleRowSelection = (rowNumber) => {
    if (selectedRow === rowNumber) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowNumber);
    }
  };

  useEffect(() => {
    getAppointmentByUser(5)
      .then((res) => {
        setAppointments(res.data.appointments);
        console.log(res.data.appointments);
      })
      .catch((err) => {
        setTimedAlert("Error getting appointments", "error", 3000);
      });
  }, []);

  const contactHandler = () => {
    alert("Contacted");
  }

  const rescheduleApplicationHandler = () => {
    alert("Rescheduled");
  }

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

  const handleMakeAppointment = () => {

    if (!selectedPetApt) {
      setTimedAlert("Please select a pet", "error", 3000);
      return;
    }

    console.log(selectedTime);

    if (selectedTime === "") {
      setTimedAlert("Select valid time", "error", 3000);
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
        getExistingAppointments(selectedVet.user_id);
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


  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button className="position-relative top-2 start-2 mb-2" onClick={() => setCurrentPanel("back")}>
        Back
      </Button>

      <div className="d-flex">
        <div className="" style={{ flex: "1 1 0", maxWidth: "70%" }}>
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
                <th scope="col">#</th>
                <th scope="col">Adopter Name</th>
                <th scope="col">Appointment For</th>
                <th scope="col">Health Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  className={selectedRow == index ? "table-primary" : ""}
                  onClick={() => toggleRowSelection(index)}
                >
                  <th scope="row">{index}</th>
                  <td>{appointment.username}</td>
                  <td>{appointment.name}</td>
                  <td>{appointment.health_status}</td>
                  <td>{appointment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRow !== null && (
          <div className="d-flex flex-column align-items-end" style={{ flex: "1 1 0", marginLeft: "20px", marginRight: "20px" }}>
            <div className="card mb-3" style={{ width: "100%" }}>
              <div className="d-flex p-3 justify-content-center">
                <img src={appointments[selectedRow].photo ? appointments[selectedRow].photo : catImg} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "20px" }} />
                <h5 className="card-title" style={{ marginRight: "50px" }}>{appointments[selectedRow].name}</h5>
                <div className="d-flex flex-column align-items-start">
                  <button className="btn btn-primary" onClick={() => setShowModalMsg(true)}
                    type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", width: "100px" }}>
                    Contact
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-danger mb-2"
                    type="button"
                    // disabled={appointments[selectedRow].application_status !== "PENDING"}
                    style={{
                      backgroundColor: "red",
                      borderColor: "red",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Reschedule
                  </button>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">Appointment</h5>
                <p className="card-text">Appointment Note: {appointments[selectedRow].appointment_text}</p>

              </div>
              <div className="d-flex flex-row">
                <div className="d-flex p-3 justify-content-center">
                </div>
                <div>
                  <table className="table table-striped" style={{ width: "300px", marginLeft: "10px" }}>
                    <thead>
                      <tr>
                        <th scope="col">Species</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <th scope="col">{appointments[selectedRow].species}</th>
                      <th scope="col">{appointments[selectedRow].breed}</th>
                      <th scope="col">{appointments[selectedRow].gender}</th>
                      <th scope="col">{appointments[selectedRow].age}</th>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
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
              <option hidden value="">
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

export default UserAppointments;
