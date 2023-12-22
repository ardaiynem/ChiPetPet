import React, { useState } from "react";
import { Button, Dropdown, FormControl } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";

function HealthReportList() {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (rowNumber) => {
    if (selectedRows.includes(rowNumber)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowNumber));
    } else {
      setSelectedRows([...selectedRows, rowNumber]);
    }
  };

  const isRowSelected = (rowNumber) => selectedRows.includes(rowNumber);

  return (
    <div className="p-0" style={{ width: "100%", marginLeft: "10px" }}>
      <Button className="position-relative top-2 start-2">Back</Button>

      <h2 style={{ marginTop: "10px" }}>Upload Health Report</h2>

      <div className="d-flex">
        <div className="" style={{ flex: "1 1 0" }}>
          <div className="d-flex justify-content-between mb-5 mt-4"></div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Species</th>
                <th scope="col">Shelter</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={isRowSelected(1) ? "table-primary" : ""}
                onClick={() => toggleRowSelection(1)}
              >
                <th scope="row">1</th>
                <td>Tüylü Laik</td>
                <td>Dog</td>
                <td>Shelter1</td>
              </tr>
              <tr
                className={isRowSelected(2) ? "table-primary" : ""}
                onClick={() => toggleRowSelection(2)}
              >
                <th scope="row">2</th>
                <td>El Gato</td>
                <td>Cat</td>
                <td>Shelter2</td>
              </tr>
              <tr
                className={isRowSelected(3) ? "table-primary" : ""}
                onClick={() => toggleRowSelection(3)}
              >
                <th scope="row">3</th>
                <td>Papağan Papağanoğlu</td>
                <td>Parrot</td>
                <td>Shelter3</td>
              </tr>
              <tr
                className={isRowSelected(4) ? "table-primary" : ""}
                onClick={() => toggleRowSelection(4)}
              >
                <th scope="row">4</th>
                <td>Donatello</td>
                <td>Turtle</td>
                <td>Shelter14</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ flex: "1 1 0", marginRight: "20px" }}
        >
          <div className="card" style={{ width: "600px" }}>
            <div className="d-flex p-3 justify-content-center">
              <img
                src={catImg}
                className="card-img-top"
                alt="Cat"
                style={{ width: "200px", marginRight: "50px" }}
              />
              <h5
                className="card-title"
                style={{ marginRight: "50px", marginBottom: "10px" }}
              >
                El Gato
              </h5>
              <table className="table table-striped" style={{ width: "200px" }}>
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
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <div className="d-flex">
                <div
                  className="d-flex flex-column gap-2"
                  style={{ marginLeft: "170px" }}
                >
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "blue",
                      borderColor: "blue",
                      color: "white",
                      maxWidth: "230px",
                    }}
                  >
                    Upload Health Record
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      backgroundColor: "blue",
                      borderColor: "blue",
                      color: "white",
                      maxWidth: "230px",
                    }}
                  >
                    Download Health Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthReportList;
