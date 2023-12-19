import { Button, Dropdown, FormControl } from 'react-bootstrap';
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
              <h5 className="card-title" style={{marginRight:"50px"}}>{appointments[selectedRow].name}</h5>
              <div className="d-flex flex-column align-items-start">
                <button className="btn btn-primary" onClick={contactHandler} type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", width: "100px" }}>
                  Contact
                </button>
                <button
                  onClick={rescheduleApplicationHandler}
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
    </div>
  );
}

export default UserAppointments;
