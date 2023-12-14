import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Dropdown, FormControl } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import { UseAuth } from "../../AuthContext";
import { UseAlert } from "../../AlertContext";
import { getApplicationByShelter, updateApplicationStatus } from '../../apiHelper/backendHelper';

/**
 * get necessary data from applications and display them
 */

function ApplicationsList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [ applications, setApplications ] = useState([]);
  const { setTimedAlert } = UseAlert();
  const { logout, userDetails } = UseAuth();
  const { currentPanel, setCurrentPanel } = useContext(PanelContext);

  useEffect(() => {
    getApplicationByShelter(userDetails.id)
      .then((res) => {
        setApplications(res.data.applications);
      })
      .catch((err) => {
        setTimedAlert("Error getting applications", "error", 3000);
      })
  }, []);

  const toggleRowSelection = (rowNumber) => {
    if (selectedRows.includes(rowNumber)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowNumber));
    } else {
      setSelectedRows([...selectedRows, rowNumber]);
    }
  };

  const isRowSelected = (rowNumber) => selectedRows.includes(rowNumber);

  const acceptApplicationHandler = () => {
    if (selectedRows.length === 0) {
      setTimedAlert("Please select an application", "error", 3000);
      return;
    }

    const applicationIds = selectedRows.map((row) => applications[row - 1].id);
    
    applicationIds.forEach((id) => {
      updateApplicationStatus(id, "accepted")
        .then((res) => {
          setTimedAlert("Application accepted", "success", 3000);
        })
        .catch((err) => {
          setTimedAlert("Error accepting application", "error", 3000);
        })
    });
  };

  const rejectApplicationHandler = () => {
    if (selectedRows.length === 0) {
      setTimedAlert("Please select an application", "error", 3000);
      return;
    }

    const applicationIds = selectedRows.map((row) => applications[row - 1].id);
    
    applicationIds.forEach((id) => {
      updateApplicationStatus(id, "rejected")
        .then((res) => {
          setTimedAlert("Application rejected", "success", 3000);
        })
        .catch((err) => {
          setTimedAlert("Error rejecting application", "error", 3000);
        })
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
                <th scope="col">Name</th>
                <th scope="col">Applied For</th>
                <th scope="col">Application Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={isRowSelected(1) ? 'table-primary' : ''}
                onClick={() => toggleRowSelection(1)}
              >
                <th scope="row">1</th>
                <td>Necdet</td>
                <td>Köpekcik</td>
                <td>Pending</td>
                <td>31.11.2023</td>
              </tr>
              <tr
                className={isRowSelected(2) ? 'table-primary' : ''}
                onClick={() => toggleRowSelection(2)}
              >
                <th scope="row">2</th>
                <td>Mehmet</td>
                <td>Pamuk</td>
                <td>Pending</td>
                <td>31.11.2023</td>
              </tr>
              <tr
                className={isRowSelected(3) ? 'table-primary' : ''}
                onClick={() => toggleRowSelection(3)}
              >
                <th scope="row">3</th>
                <td>Ahmet</td>
                <td>Kedi</td>
                <td>Rejected</td>
                <td>31.09.2023</td>
              </tr>
              <tr
                className={isRowSelected(4) ? 'table-primary' : ''}
                onClick={() => toggleRowSelection(4)}
              >
                <th scope="row">4</th>
                <td>Kerem Aktürkoğlu</td>
                <td>Köpük</td>
                <td>Accepted</td>
                <td>31.11.2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex flex-column align-items-end" style={{ flex: "1 1 0", marginLeft: "20px", marginRight: "20px" }}>
          <div className="card mb-3" style={{ width: "100%" }}>
            <div className="d-flex p-3 justify-content-center">
              <img src={catImg} className="card-img-top" alt="Cat" style={{ width: "200px", marginRight: "20px" }} />
              <h5 className="card-title" style={{marginRight:"50px"}}>Kerem Aktürkoğlu</h5>
              <div className="d-flex flex-column align-items-start">
                <button onClick={rejectApplicationHandler} className="btn btn-danger mb-2" type="button" style={{ backgroundColor: "red", borderColor: "red", color: "white", width: "100px" }}>
                  Reject
                </button>
                <button onClick={acceptApplicationHandler} className="btn btn-success mb-2" type="button" style={{ backgroundColor: "green", borderColor: "green", color: "white", width: "100px" }}>
                  Accept
                </button>
                <button className="btn btn-primary" type="button" style={{ backgroundColor: "blue", borderColor: "blue", color: "white", width: "100px" }}>
                  Contact
                </button>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title">Application</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <div className="d-flex flex-row">
              <div className="mr-3">
                <table className="table table-striped" style={{ width: "300px", marginLeft: "10px" }}>
                  <tbody>
                    <tr>
                      <th scope="row">Species</th>
                      <td>Cat</td>
                    </tr>
                    <tr>
                      <th scope="row">Breed</th>
                      <td>Street Cat</td>
                    </tr>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>Male</td>
                    </tr>
                    <tr>
                      <th scope="row">Age</th>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
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

export default ApplicationsList;
