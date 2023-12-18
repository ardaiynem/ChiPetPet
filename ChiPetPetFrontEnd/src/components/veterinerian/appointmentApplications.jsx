import { Button, Dropdown, FormControl } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { getAppointmentByVeterinarian } from "../../apiHelper/backendHelper";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";

/**
 * change the way appointments are displayed
 * have a look at here
 */

function AppointmentList() {
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
    getAppointmentByVeterinarian(userDetails.user_id)
      .then((res) => {
        setAppointments(res.data.appointments);
      })
      .catch((err) => {
        setTimedAlert("Error getting appointments", "error", 3000);
      });

  }, []);

  const contactHandler = () => {
    alert("Contacted");
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
                <th scope="col">Name</th>
                <th scope="col">Appointment For</th>
                <th scope="col">Appointment Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  className={ isRowSelected(index) ? 'table-primary' : '' }
                  onClick={() => toggleRowSelection(index)}
                >
                  <th scope="row">{index}</th>
                  <td>{appointment.pet_name}</td>
                  <td>{appointment.appointment_for}</td>
                  <td>{appointment.appointment_status}</td>
                  <td>{appointment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-column align-items-end" style={{ flex: "1 1 0", marginLeft: "20px", marginRight: "20px" }}>
          <div className="card mb-3" style={{ width: "100%" }}>
            <div className="d-flex p-3 justify-content-center">
              <img src={catImg} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "20px" }} />
              <h5 className="card-title" style={{marginRight:"50px"}}>Kerem Aktürkoğlu</h5>
              <div className="d-flex flex-column align-items-start">
                <button className="btn btn-primary" onClick={contactHandler} type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", width: "100px" }}>
                  Contact
                </button>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  value="2018-06-12T19:30"
                  min="2018-06-07T00:00"
                  max="2018-06-14T00:00" style={{marginTop: "10px"}}/>
              </div>
            </div>
            
            <div className="card-body">
              <h5 className="card-title">Application</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="d-flex flex-row">
              <div className="d-flex p-3 justify-content-center">
              <img src={catImg} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "20px" }} />
              <h5 className="card-title" style={{marginRight:"50px"}}>Köpük</h5>
            </div>
              <div>
                <table className="table table-striped" style={{ width: "300px", marginLeft: "10px" }}>
                <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Species</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pamuk</td>
                <td>Dog</td>
              </tr>
              <tr>
                <td>El Gato</td>
                <td>Cat</td>
              </tr>
              <tr >
                <td>Splinter</td>
                <td>Rat</td>
              </tr>
            </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
