import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Dropdown, FormControl } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import {
  getApplicationByAdopter,
  deleteApplication,
} from "../../apiHelper/backendHelper";

/**
 * remove selection when clicked outside
 * dropdown menu items are empty
 */

function ApplicationsList() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [applications, setApplications] = useState([]);
  const { setTimedAlert } = useAlert();
  const { userDetails } = useAuth();
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  useEffect(() => {
    getApplicationByAdopter(userDetails.user_id)
      .then((res) => {
        setApplications(res.data.applications);
      })
      .catch((err) => {
        setTimedAlert("Error getting applications", "error", 3000);
      });
  }, []);

  const toggleRowSelection = (e, rowNumber) => {
    e.stopPropagation();
    console.log(rowNumber);
    if (selectedRow === rowNumber) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowNumber);
    }
  };

  const cancelApplicationHandler = () => {
    if (selectedRow === null) {
      setTimedAlert("Please select an application", "error", 3000);
      return;
    }

    const applicationId = [applications[selectedRow].application_id];

    deleteApplication(applicationId)
      .then((res) => {
        setTimedAlert("Application cancelled", "success", 3000);
        setApplications(
          applications.filter((application) => {
            return application.application_id !== applicationId[0];
          })
        );
      })
      .catch((err) => {
        setTimedAlert("Error cancelling application", "error", 3000);
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

      <div className="d-flex" onClick={() => setSelectedRow(null)}>
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

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Applied For</th>
                <th scope="col">Application Status</th>
                <th scope="col">Animal Shelter</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr
                  className={selectedRow == index ? "table-primary" : ""}
                  onClick={(e) => toggleRowSelection(e, index)}
                >
                  <th scope="row">{index}</th>
                  <td>{application.adopter_username}</td>
                  <td>{application.pet_name}</td>
                  <td>{application.application_status}</td>
                  <td>{application.animal_shelter_username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="d-flex flex-column align-items-end"
          style={{ flex: "1 1 0", marginLeft: "20px", marginRight: "20px" }}
        >
        {selectedRow !== null && (
          <div className="card mb-3" style={{ width: "100%" }}>
            <div className="d-flex p-3 justify-content-center">
              <img
                src={catImg}
                className="card-img-top"
                alt="Cat"
                style={{ width: "200px", marginRight: "20px" }}
              />
              <h5 className="card-title" style={{ marginRight: "50px" }}>
                {applications[selectedRow].adopter_username}
              </h5>
              <div className="d-flex flex-column align-items-start">
                <button
                  onClick={cancelApplicationHandler}
                  className="btn btn-danger mb-2"
                  type="button"
                  disabled={applications[selectedRow].application_status !== "PENDING"}
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
                    width: "100px",
                  }}
                >
                  Cancel
                </button>
                
                <button
                  className="btn btn-primary"
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
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">Application</h5>
              <p className="card-text">
                {applications[selectedRow].application_text}
              </p>
            </div>
            <div className="d-flex gap-3" style={{ flex: "1 1 0" }}>
                <div style={{ flex: "1 1 0" }}>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Species</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td> {applications[selectedRow].pet_species} </td>
                          <td> {applications[selectedRow].pet_breed} </td>
                          <td> {applications[selectedRow].pet_gender} </td>
                          <td> {applications[selectedRow].pet_age} </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationsList;
