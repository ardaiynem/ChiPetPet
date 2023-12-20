import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { uploadHealthRecord } from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";

function UploadHealthRecord(props) {
  const { setTimedAlert } = useAlert();

  let petid = props.petid;

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);


  const [fertility, setFertility] = useState("Fertile");
  const [healthRecordText, setHealthRecordText] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + currentDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    setCurrentDate(formattedDate);
  }, []);

 
  const handleSubmit = () => {
    const data = {
      pet_id: petid,                                                     
      date: currentDate,
      fertility: fertility,
      health_report: healthRecordText
    };

    console.log(data)

    uploadHealthRecord(data)
      .then((res) => {
        console.log(res);
        setTimedAlert("Health Record uploaded successfully", "success", 3000);

      })
      .catch((err) => {
        console.log(err);
        setTimedAlert("Error uploading health record", "error", 3000);
      });
  };

  return (
    <div className="p-4">
      <Button className="position-relative start-2 mt-4" onClick={() => setCurrentPanel("back")}>
        Back
      </Button>
      <h2 className='mt-2'>Upload Health Record</h2>
      <Form >
        <select className="form-select mb-3" onChange={(e) => setFertility(e.target.value)}>
          <option selected value="Fertile">Fertile</option>
          <option value="Not Fertile">Not Fertile</option>
        </select>
  
        <div className="form-floating">
          <textarea className="form-control" onChange={(e) => setHealthRecordText(e.target.value)} placeholder="Input health information" id="floatingTextarea2" style={{ height: "200px", width: "300px" }}></textarea>
          <label htmlFor="floatingTextarea2">Health Report Information</label>
        </div>
        <Button className="mt-4" variant="primary" type="button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadHealthRecord;