import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import { Button, Form, Row, Col, Dropdown } from 'react-bootstrap';

function UploadHealthRecord() {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
  };

  const { currentPanel, setCurrentPanel } = useContext(PanelContext);
  const [data, setData] = useState({fertile: "Fertile", text: ""});
  const [fertilityStatus, setFertilityStatus] = useState("Fertile");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada formun gönderilmesi veya işlenmesi işlemleri gerçekleştirilebilir.
    console.log('Form submitted:', data);
  };

  return (
    <div className="p-4">
      <Button className="position-relative start-2 mt-4" onClick={() => setCurrentPanel("back")}>
        Back
      </Button>
      <h2 className='mt-2'>Upload Health Record</h2>
      <Form onSubmit={handleSubmit}>
        <select class="form-select mb-3" onChange={(e) => setData({...data, fertility: e.target.value})}>
          <option selected value="Fertile">Fertile</option>
          <option value="Not Fertile">Not Fertile</option>
        </select>

        <div className="form-floating">
          <textarea className="form-control" onChange={(e) => setData({...data, text: e.target.value})} placeholder="Input health information" id="floatingTextarea2" style={{ height: "200px", width: "300px" }}></textarea>
          <label htmlFor="floatingTextarea2">Healt Report Information</label>
        </div>
        <Button className="mt-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadHealthRecord;