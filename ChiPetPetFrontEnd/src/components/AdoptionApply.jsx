import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";
import { PanelContext } from "../contexts/panelContext";
import React, { useContext } from "react";
import { useState } from "react";
import { createApplication } from "../apiHelper/backendHelper";
import { useAuth } from "../AuthContext";
import { useAlert } from "../AlertContext";

/**
 * need pet_id and animal_shelter_id to be passed in
 */


function AdoptionApply() {

    const { logout, userDetails } = useAuth();    
    const { setTimedAlert } = useAlert();
    const { setCurrentPanel } = useContext(PanelContext);
    const [application_note, setApplicationNote] = useState("");

    const applicationHandler = () => {
        const data = {
            adopter_id: userDetails.user_id,
            pet_id: 1,
            animal_shelter_id: 1,
            application_note: application_note
        }

        createApplication(data)
            .then((res) => {
                setTimedAlert("Application created successfully", "success", 3000);
                setCurrentPanel("back");
            })
            .catch((err) => {
                setTimedAlert("Error creating application", "error", 3000);
            })
    }

    return (
        <>
            <div className="p-0">
                <div>
                    <h1 className="text-center">Adoption Application</h1>
                    <div class="container" style={{marginTop:""}}>
    <div class="row">
        <div class="col-md-6">
            <div class="mt3">
                <div>
                    <p>Adopter:</p>
                    <p>Pet:</p>
                    <p>Shelter</p>
                </div>
            </div>
            <p style={{background: "rgba(255, 182, 193, 0.5)", width:"300px", fontSize:"12px"}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            <p style={{background: "rgba(255, 182, 193, 0.5)", width:"300px", fontSize:"12px"}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>
        <div class="col-md-6">
            <div class="mt3">
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Adoption Note:</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" style={{width:"500px"}} value={application_note} onChange={(e) => setApplicationNote(e.target.value)}></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
                    {/* Add your form or additional content here */}
                </div>
                <div className="mt-3 text-center">
                            {/* Add buttons below */}
                            <Button variant="primary" className="me-2" style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c" }} onClick={() => setCurrentPanel("back")}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="me-2" style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c" }} onClick={applicationHandler}>
                                Apply
                            </Button>
                        </div>
            </div>
        </>
    )
}

export default AdoptionApply;