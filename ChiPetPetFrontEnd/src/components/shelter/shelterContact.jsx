import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { PanelContext } from "../../contexts/panelContext";
import { getShelterById } from "../../apiHelper/backendHelper";
import { useAlert } from "../../AlertContext";

function ShelterContact(props) {
    const {setTimedAlert} = useAlert();
    const { setCurrentPanel } = useContext(PanelContext);

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

    return (
        <>
            <div className="p-0">
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                        Back
                </Button>
                <div style={{marginTop: "10px"}}>
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
               
            </div>
        </>
    )
}

export default ShelterContact;