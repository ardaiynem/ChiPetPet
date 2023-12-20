import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { PanelContext } from "../contexts/panelContext";
import { getHealthRecordsByPet } from "../apiHelper/backendHelper";
import { useAlert } from "../AlertContext";

function HealthRecords(props) {
  const { setTimedAlert } = useAlert();

  let { petid, petname } = props;
  console.log(petid);
  const [healthRecords, setHealthRecords] = useState([]);

  /*
        gets these:
        'pet_id'
        'date'
        'fertility'
        'health_report'
    */
  useEffect(() => {
    getHealthRecordsByPet(petid)
      .then((res) => {
        setHealthRecords(res.data.health_records);
        console.log(res.data.health_records);
      })
      .catch((err) => {
        setTimedAlert("Error retrieving animals", "error", 3000);
      });
  }, []);

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleRowSelection = (record) => {
    setSelectedRecord(record);
  };

  return (
    <>
      <div className="p-0 w-100 h-100" style={{ marginTop: "5px" }}>
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>
        <div className="d-flex justify-content-between"></div>

        <div className="d-flex" style={{ marginTop: "10px" }}>
          <table className="table table-striped" style={{ width: "50%" }}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date </th>
              </tr>
            </thead>
            <tbody>
              {healthRecords &&
                healthRecords.map((record) => (
                  <tr
                    onClick={() =>
                      handleRowSelection({
                        date: record.date,
                        fertility: record.fertility,
                        context: record.health_report,
                      })
                    }
                  >
                    <td scope="row">{petname}</td>
                    <td>{record.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {selectedRecord && (
            <Card style={{ width: "30%", marginLeft: "250px" }}>
              <Card.Body>
                <Card.Title>Selected Record for {petname}</Card.Title>
                <Card.Text>
                  <strong>Date:</strong> {selectedRecord.date}
                  <br />
                  <strong>Fertility:</strong> {selectedRecord.fertility}
                  <br />
                  <strong>Context:</strong> {selectedRecord.context}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default HealthRecords;
