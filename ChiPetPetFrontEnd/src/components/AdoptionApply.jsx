import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";
import { PanelContext } from "../contexts/panelContext";
import React, { useContext } from "react";
import { useState } from "react";
import { createApplication } from "../apiHelper/backendHelper";
import { useAuth } from "../AuthContext";
import { useAlert } from "../AlertContext";


function AdoptionApply(props) {

    const { userDetails } = useAuth();    
    const { setTimedAlert } = useAlert();
    const { setCurrentPanel } = useContext(PanelContext);
    const [application_note, setApplicationNote] = useState("");
    const { pet_id, animal_shelter_id, pet_name, animal_shelter_name } = props;

    const applicationHandler = () => {

        if (application_note === "") {
            setTimedAlert("Please write an application note", "error", 3000);
            return;
        }

        const data = {
            adopter_id: userDetails.user_id,
            pet_id: pet_id,
            animal_shelter_id: animal_shelter_id,
            application_text: application_note
        }

        createApplication(data)
            .then((res) => {
                setTimedAlert("Application created successfully", "success", 3000);
                setApplicationNote("");
                setCurrentPanel("back");
            })
            .catch((err) => {
                setTimedAlert("Error creating application", "error", 3000);
                setTimedAlert(err, "error", 3000);
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
                                    <p>Adopter: {userDetails.username}</p>
                                    <p>Pet: {pet_name}</p>
                                    <p>Shelter: {animal_shelter_name}</p>
                                </div>
                            </div>
                            <p style={{background: "rgba(255, 182, 193, 0.5)", width:"300px", fontSize:"12px"}}
                            > Kindly write a short paragraph explaining your incentive to adopt this animal</p>
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
                </div>
                <div className="mt-3 text-center">
                    {/* Add buttons below */}
                    <Button variant="primary" className="me-2" 
                    style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c" }} 
                    onClick={() => setCurrentPanel("back")}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="me-2" 
                    style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c" }} 
                    onClick={applicationHandler}>
                        Apply
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AdoptionApply;