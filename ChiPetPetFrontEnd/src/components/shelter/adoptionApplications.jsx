import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Dropdown, FormControl } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../AlertContext";
import {
  getApplicationByShelter,
  updateApplicationStatus,
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
    getApplicationByShelter(userDetails.user_id)
      .then((res) => {
        setApplications(res.data.applications);
      })
      .catch((err) => {
        setTimedAlert("Error getting applications", "error", 3000);
      });
  }, []);

  const toggleRowSelection = (rowNumber) => {
    console.log(rowNumber);
    if (selectedRow === rowNumber) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowNumber);
    }
  };

  const acceptApplicationHandler = () => {
    if (selectedRow === null) {
      setTimedAlert("Please select an application", "error", 3000);
      return;
    }

    const applicationId = [applications[selectedRow].application_id];

    const data = {
      application_id: applicationId,
      application_status: "SHELTER_APPROVED",
    };

    updateApplicationStatus(data)
      .then((res) => {
        setApplications(
          applications.filter(
            (a) => applications[selectedRow].application_id !== a.application_id
          )
        );
        setSelectedRow(null);
        setTimedAlert("Application approved", "success", 3000);
      })
      .catch((err) => {
          setTimedAlert("Error accepting application", "error", 3000);
      }); 
  };

  const rejectApplicationHandler = () => {
    if (selectedRow === null) {
      setTimedAlert("Please select an application", "error", 3000);
      return;
    }

    const applicationId = [applications[selectedRow].application_id];

    const data = {
      application_id: applicationId,
      application_status: "REJECTED",
    };

    updateApplicationStatus(data)
      .then((res) => {
        setApplications(
          applications.filter(
            (a) => applications[selectedRow].application_id !== a.application_id
          )
        );
        setSelectedRow(null);
        setTimedAlert("Application rejected", "success", 3000);
      })
      .catch((err) => {
        setTimedAlert("Error rejecting application", "error", 3000);
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
                  onClick={() => toggleRowSelection(index)}
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
                    onClick={rejectApplicationHandler}
                    className="btn btn-danger mb-2"
                    type="button"
                    disabled={
                      applications[selectedRow].application_status !== "PENDING"
                    }
                      style={{
                        backgroundColor: "red",
                        borderColor: "red",
                        color: "white",
                        width: "100px",
                      }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={acceptApplicationHandler}
                    className="btn btn-success mb-2"
                    type="button"
                    disabled={
                      applications[selectedRow].application_status !== "PENDING"
                    }
                    style={{
                      backgroundColor: "green",
                      borderColor: "green",
                      color: "white",
                      width: "100px",
                    }}
                  >
                    Accept
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
                {/* <div>
                <table
                  className="table table-striped"
                  style={{ width: "300px", marginLeft: "10px" }}
                >
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
                    <tr>
                      <td>Splinter</td>
                      <td>Rat</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationsList;
