import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { PanelContext } from "../contexts/panelContext";

function HealthRecords() {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleRowSelection = (record) => {
        setSelectedRecord(record);
    };

    return (
        <>
            <div className="p-0 w-100 h-100" style={{ marginTop: "5px" }}>
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                    Back
                </Button>
                <div className="d-flex justify-content-between">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="d-flex" style={{marginTop:"10px"}}>
                    <table className="table table-striped" style={{ width: "50%" }}>
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Time </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={() => handleRowSelection({ date: "31.12.2001", time: "12:32", age: "31", fertility: "non neutered", context: "Aşılarını oldu afferim aslanıma" })}>
                                <td scope="row">31.12.2002</td>
                                <td>12:32</td>
                            </tr>
                            <tr onClick={() => handleRowSelection({ date: "01.01.2002", time: "02:02", age: "32", fertility: "neutered", context: "Kısırlaştırıldı, paraziti yok" })}>
                                <td scope="row">01.01.2002</td>
                                <td>02:02</td>
                            </tr>
                        </tbody>
                    </table>
                    {selectedRecord && (
                        <Card style={{ width: "30%", marginLeft: "250px" }}>
                            <Card.Body>
                                <Card.Title>Selected Record for "PET_NAME"</Card.Title>
                                <Card.Text>
                                    <strong>Date:</strong> {selectedRecord.date}
                                    <br />
                                    <strong>Time:</strong> {selectedRecord.time}
                                    <br />
                                    <strong>Age:</strong> {selectedRecord.age}
                                    <br />
                                    <strong>Fertility:</strong> {selectedRecord.fertility}
                                    <br />
                                    <strong>Context:</strong> {selectedRecord.context}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}

export default HealthRecords;
