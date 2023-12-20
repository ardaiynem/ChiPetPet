import { Button, Dropdown, FormControl, Modal, Form } from "react-bootstrap";
import emptyImg from "../../assets/empty.png";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import {
  getAppointmentByUser,
  deleteAppointment,
  updateAppointment,
  getVeterinarianAppointmentDates,
} from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";

function UserAppointments() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const { setTimedAlert } = useAlert();
  const { userDetails } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [appointmentText, setAppointmentText] = useState("");
  const [existingAppointments, setExistingAppointments] = useState([]);

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
    getAppointmentByUser(userDetails.user_id)
      .then((res) => {
        setAppointments(res.data.appointments);
        console.log(res.data.appointments);
      })
      .catch((err) => {
        setTimedAlert("Error getting appointments", "error", 3000);
      });
  }, []);

  const cancelAppointmentHandler = () => {
    if (selectedRow === null) {
      setTimedAlert("Please select an appointment", "error", 3000);
      return;
    }

    const appointmentId = [appointments[selectedRow].appointment_id];

    deleteAppointment(appointmentId)
      .then((res) => {
        setTimedAlert("Appointment cancelled", "success", 3000);

        setAppointments(
          appointments.filter((appointment) => {
            return appointment.appointment_id !== appointmentId[0];
          })
        );

        setSelectedRow(null);
      })
      .catch((err) => {
        setTimedAlert("Error cancelling appointment", "error", 3000);
      });
  };

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

  useEffect(() => {
    if (selectedRow !== null) {
      getExistingAppointments(appointments[selectedRow].veterinarian_id);
    }
  }, [selectedRow]);

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

  const handleRescheduleAppointment = () => {
    if (selectedRow === null) {
      setTimedAlert("Please select an appointment", "error", 3000);
      return;
    }

    if (!selectedDate) {
      setTimedAlert("Please select a date", "error", 3000);
      return;
    }

    if (!selectedTime) {
      setTimedAlert("Please select a time", "error", 3000);
      return;
    }

    // create date and time string
    const formattedDate = `${selectedDate} ${selectedTime}`;
    console.log("formattedDate", formattedDate);

    const data = {
      appointment_id: appointments[selectedRow].appointment_id,
      date_and_time: formattedDate,
      location: appointments[selectedRow].location,
      appointment_text: appointmentText,
      user_id: userDetails.user_id,
      veterinarian_id: appointments[selectedRow].veterinarian_id,
      pet_id: appointments[selectedRow].pet_id,
    };

    updateAppointment(data)
      .then((res) => {
        setShowModal(false);
        setAppointmentText("");
        getExistingAppointments(appointments[selectedRow].veterinarian_id);
        setSelectedRow(null);
        setTimedAlert("Appointment successfully rescheduled", "success", 3000);
      })
      .catch((err) => {
        setTimedAlert("Error rescheduling appointment", "error", 3000);
      });
  };

  const handleContact = () => {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    axios
      .post("http://127.0.0.1:8000/message/send", {
        user_id: userDetails.user_id,
        date_and_time: formattedDate,
        receiver_id: appointments[selectedRow].veterinarian_id,
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
      <Button
        className="position-relative top-2 start-2 mb-2"
        onClick={() => setCurrentPanel("back")}
      >
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
                  <td>{appointment.date.replace('T', ' ').slice(0, -3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedRow !== null && (
          <div
            className="d-flex flex-column align-items-end"
            style={{ flex: "1 1 0", marginLeft: "20px", marginRight: "20px" }}
          >
            <div className="card mb-3" style={{ width: "100%" }}>
              <div className="d-flex p-3 justify-content-center">
                <img
                  src={
                    appointments[selectedRow].photo
                      ? appointments[selectedRow].photo
                      : emptyImg
                  }
                  className="card-img-top"
                  alt="Cat"
                  style={{ width: "200px", marginRight: "20px" }}
                />
                <h5 className="card-title" style={{ marginRight: "50px" }}>
                  {appointments[selectedRow]?.name}
                </h5>
                <div className="d-flex flex-column align-items-start">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowModalMsg(true)}
                    type="button"
                    style={{
                      backgroundColor: "blue",
                      borderColor: "blue",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-success mb-2"
                    type="button"
                    style={{
                      backgroundColor: "green",
                      borderColor: "green",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={cancelAppointmentHandler}
                    className="btn btn-danger mb-2"
                    type="button"
                    style={{
                      backgroundColor: "red",
                      borderColor: "red",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">Appointment</h5>
                <p className="card-text">
                  Appointment Note:{" "}
                  {appointments[selectedRow]?.appointment_text}
                </p>
              </div>
              <div className="d-flex flex-row">
                <div className="d-flex p-3 justify-content-center"></div>
                <div>
                  <table
                    className="table table-striped"
                    style={{ width: "300px", marginLeft: "10px" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">Species</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      <th scope="col">{appointments[selectedRow]?.species}</th>
                      <th scope="col">{appointments[selectedRow]?.breed}</th>
                      <th scope="col">{appointments[selectedRow]?.gender}</th>
                      <th scope="col">{appointments[selectedRow]?.age}</th>
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
          <Modal.Title>Reschedule Appointment</Modal.Title>
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
          <Button variant="primary" onClick={handleRescheduleAppointment}>
            Reschedule Appointment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for contacting */}
      <Modal show={showModalMsg} onHide={() => setShowModalMsg(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Send Message to {appointments[selectedRow]?.veterinarian_id}
          </Modal.Title>
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
