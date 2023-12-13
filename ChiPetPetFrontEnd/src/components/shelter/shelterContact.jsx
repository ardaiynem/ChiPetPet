import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import React, { useContext } from "react";
import { PanelContext } from "../../contexts/panelContext";

function ShelterContact() {

    const { setCurrentPanel } = useContext(PanelContext);

    const shelterInfo = {
        name: "Example Shelter",
        phoneNumber: "123-456-7890",
        email: "example@shelter.com",
        address: "123 Shelter St, Cityville, State, 12345",
      };

    return (
        <>
            <div className="p-0">
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                        Back
                </Button>
                <div style={{marginTop: "10px"}}>
      <h2>Contact Shelter</h2>
      <div>
        <strong>Name:</strong> {shelterInfo.name}
      </div>
      <div>
        <strong>Phone Number:</strong> {shelterInfo.phoneNumber}
      </div>
      <div>
        <strong>Email:</strong> {shelterInfo.email}
      </div>
      <div>
        <strong>Address:</strong> {shelterInfo.address}
      </div>
      {/* İhtiyaç duyulursa buraya ek bilgiler ekleyebilirsiniz */}
    </div>
               
            </div>
        </>
    )
}

export default ShelterContact;