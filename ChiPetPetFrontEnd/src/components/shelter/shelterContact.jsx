import { Card, Button, Row, Col, Pagination, Dropdown, Stack, Modal } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { PanelContext } from "../../contexts/panelContext";
import { getShelterById } from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";

function ShelterContact(props) {
  const { setTimedAlert } = useAlert();
  const { setCurrentPanel } = useContext(PanelContext);
  const [showModalMsg, setShowModalMsg] = useState(false);


  let shelterid = props.shelterid;
  const [shelter, setShelter] = useState([]);

  useEffect(() => {
    // Fetch pets data from the backend when the component mounts
    getShelterById(shelterid)
      .then((res) => {
        setShelter(res.data.shelter);
      })
      .catch((err) => {
        setTimedAlert("Error retrieving animals", "error", 3000);
      });
  }, []);

  const handleContact = () => {
    setShowModalMsg(false);
  };

  return (
    <>
      <div className="p-0">
        <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
          Back
        </Button>
        <Button className="position-relative top-2 start-2 ms-3" onClick={() => setShowModalMsg(true)}>
          Send Message
        </Button>
        <div style={{ marginTop: "10px" }}>
          <h2>Contact Shelter</h2>
          <div>
            <strong>Name:</strong> {shelter.username}
          </div>
          <div>
            <strong>Phone Number:</strong> {shelter.contact}
          </div>
          <div>
            <strong>Email:</strong> {shelter.email}
          </div>
          <div>
            <strong>Address:</strong> {shelter.address}
          </div>
          {/* İhtiyaç duyulursa buraya ek bilgiler ekleyebilirsiniz */}
        </div>
        <Modal show={showModalMsg} onHide={() => setShowModalMsg(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Send Message to {shelter.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "200px" }}></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleContact}>
              Send Message
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default ShelterContact;