import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

function UploadHealthRecord() {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada formun gönderilmesi veya işlenmesi işlemleri gerçekleştirilebilir.
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-4">
        <Button className="position-relative start-2 mt-4">
            Back
        </Button>
      <h2 className='mt-2'>Upload Health Record</h2>
      <Form onSubmit={handleSubmit}>
          <Col>
            <label class="form-label" for="customFile">Upload a .pdf file</label>
            <input type="file" class="form-control" id="customFile" />
          </Col>      
        <Button className="mt-4" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadHealthRecord;