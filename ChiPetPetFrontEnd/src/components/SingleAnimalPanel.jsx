import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";
import { PanelContext } from "../contexts/panelContext";
import React, { useContext } from "react";
import AdoptionApply from "./AdoptionApply";
import ShelterContact from "./shelter/shelterContact";



function SingleAnimalPanel() {
    let animal = [
        "Catto1"
        , "Catto2"
        , "Catto3"
        , "Catto4"
        , "Catto5"
        , "Catto6"
    ]
    const { setCurrentPanel } = useContext(PanelContext);

    return (
        <>
            <div className="p-0">
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                        Back
                </Button>
               
                <div className="d-flex w-70 ms-3 mt-3">
                    <img src={catImg} style={{ objectFit: "cover", maxWidth: "50%" }} />
                    <div className="ms-3">
                        <h1>Hi, I am a cat</h1>
                        <p>From: </p>
                        <div className="mt-3 d-flex flex-wrap">
                            <div className="column me-4">
                                <p>Species:</p>
                                <p>Breed:</p>
                            </div>
                            <div className="column" style={{marginLeft: "50px"}}>
                                <p>Age:</p>
                                <p>Gender:</p>
                            </div>
                        </div>
                        <p>This is some information about the cat.</p>
                    </div>
                </div>
                <div className="mt-3">
                            </div>
                            <div className="mt-3">
                            {/* Add buttons below */}
                            <Button variant="primary" className="me-2" style={{ borderWidth:"3px", color: "white", borderRadius:"20px" }} onClick={() => setCurrentPanel(<AdoptionApply/>)}>
                                Apply For Adoption
                            </Button>
                            <Button variant="primary" className="me-2" style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c" }}>
                                See Health Report
                            </Button>
                            <Button variant="primary" className="me-2" style={{ borderWidth:"3px", background: "white", borderRadius:"20px", color:"#f0087c"  }} onClick={() => setCurrentPanel(<ShelterContact/>)}>
                                Contact With Shelter
                            </Button>
                        </div>
            </div>
        </>
    )
}

export default SingleAnimalPanel;