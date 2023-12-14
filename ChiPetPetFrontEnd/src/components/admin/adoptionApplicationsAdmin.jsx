import { Button, Dropdown, FormControl } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { UseAuth } from "../../AuthContext";
import { UseAlert } from "../../AlertContext";
import { getAllApplications } from '../../apiHelper/backendHelper';

/**
 * admins should be able to accept or reject adoption applications
 * add functionality to select applications
 */

function AdoptionApplicationsAdmin() {
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [ applications, setApplications ] = useState([]);
  const { setTimedAlert } = UseAlert();
  const { logout, userDetails } = UseAuth();

  useEffect(() => {
    getAllApplications()
      .then((res) => {
        setApplications(res.data.applications);
      })
      .catch((err) => {
        setTimedAlert("Error getting applications", "error", 3000);
      })
  }, []);

  // const acceptApplicationHandler = () => {
  //   if (selectedRows.length === 0) {
  //     setTimedAlert("Please select an application", "error", 3000);
  //     return;
  //   }

  //   const applicationIds = selectedRows.map((row) => applications[row - 1].id);
    
  //   applicationIds.forEach((id) => {
  //     updateApplicationStatus(id, "accepted")
  //       .then((res) => {
  //         setTimedAlert("Application accepted", "success", 3000);
  //       })
  //       .catch((err) => {
  //         setTimedAlert("Error accepting application", "error", 3000);
  //       })
  //   });
  // };

  // const rejectApplicationHandler = () => {
  //   if (selectedRows.length === 0) {
  //     setTimedAlert("Please select an application", "error", 3000);
  //     return;
  //   }

  //   const applicationIds = selectedRows.map((row) => applications[row - 1].id);
    
  //   applicationIds.forEach((id) => {
  //     updateApplicationStatus(id, "rejected")
  //       .then((res) => {
  //         setTimedAlert("Application rejected", "success", 3000);
  //       })
  //       .catch((err) => {
  //         setTimedAlert("Error rejecting application", "error", 3000);
  //       })
  //   });
  // };

  return (
    <div className="p-0" style={{ width: "100%" }}>
      <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
        Back
      </Button>

      <div className="d-flex">
        <div className="p-3" style={{ flex: "1 1 0" }}>
          <div className="d-flex justify-content-between mb-5">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
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
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{application.adopter_first_name}</td>
                  <td>{application.adopter_last_name}</td>
                  <td>{application.application_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center p-3" style={{ flex: "1 1 0" }}>
          <div className="card border-primary mb-3 w-100">
            <div className="d-flex card-header justify-content-start p-3">
              <img src={catImg} style={{ width: "100px", borderRadius: "50%", flex: "0 0 auto" }} />
              <div className='d-flex flex-column align-items-start justify-content-center ms-3' style={{ flex: "4 4 auto" }}>
                <p>Username</p>
                <button className="btn btn-primary" type="button">Contact</button>
              </div>
              <div className='d-flex flex-column gap-2' style={{ flex: "2 2 auto" }}>
                <button className="btn btn-primary" type="button">Contact</button>
                <button className="btn btn-primary" type="button">Contact</button>
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <div style={{ flex: "1 1 100px" }}>
                <div className="form-floating h-100 mb-3">
                  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100%" }}></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
              </div>
              <div className="d-flex gap-3" style={{ flex: "1 1 0" }}>
                <div style={{ flex: "1 1 0" }}>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application, index) => (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{application.adopter_first_name}</td>
                          <td>{application.adopter_last_name}</td>
                          <td>{application.application_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ flex: "1 1 0" }}>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application, index) => (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{application.adopter_first_name}</td>
                          <td>{application.adopter_last_name}</td>
                          <td>{application.application_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >)
}

export default AdoptionApplicationsAdmin;
