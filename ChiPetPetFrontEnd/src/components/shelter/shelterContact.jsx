import {
  Card,
  Button,
  Row,
  Col,
  Pagination,
  Dropdown,
  Stack,
  Modal,
} from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { PanelContext } from "../../contexts/panelContext";
import { getShelterById } from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";
import axios from "axios";
import { useAuth } from "../../AuthContext";

function ShelterContact(props) {
  const { userDetails } = useAuth();
  const { setTimedAlert } = useAlert();
  const { setCurrentPanel } = useContext(PanelContext);
  const [showModalMsg, setShowModalMsg] = useState(false);
  const [message, setMessage] = useState("");

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
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    axios
      .post("http://127.0.0.1:8000/message/send", {
        user_id: userDetails.user_id,
        date_and_time: formattedDate,
        receiver_id: shelterid,
        content: message,
      })
      .then((res) => {
        setShowModalMsg(false);
        setMessage("");
        setTimedAlert("Message successfully sent", "success", 3000);
      });
    setShowModalMsg(false);
  };

  return (
    <>
      <div className="p-0">
        <Button
          className="position-relative top-2 start-2"
          onClick={() => setCurrentPanel("back")}
        >
          Back
        </Button>
        <Button
          className="position-relative top-2 start-2 ms-3"
          onClick={() => setShowModalMsg(true)}
        >
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
              <textarea
                className="form-control"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                style={{ height: "200px" }}
              ></textarea>
              <label htmlFor="floatingTextarea2">Type your message here</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setMessage("");
                setShowModalMsg(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleContact();
                setMessage("");
                setShowModalMsg(false);
              }}
            >
              Send Message
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ShelterContact;
