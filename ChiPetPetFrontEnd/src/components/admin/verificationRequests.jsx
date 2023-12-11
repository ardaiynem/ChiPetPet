import { Button, Dropdown, FormControl } from 'react-bootstrap';
import catImg from "../../assets/cat1.jpeg";
import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";

function VerificationRequests() {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);

    return (
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>

            <div className="d-flex">
                <div className="p-3" style={{ flex: "1 1 0" }}>
                    <div className="d-flex justify-content-between mb-5">
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

                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center p-3" style={{ flex: "1 1 0", height: "60vh" }}>
                    <div className="card border-primary mb-3 w-100">
                        <div className="d-flex card-header justify-content-start p-3">
                            <img src={catImg} style={{ width: "100px", borderRadius: "50%", flex: "0 0 auto" }} />
                            <div className='d-flex flex-column align-items-start justify-content-center ms-3' style={{ flex: "4 4 auto" }}>
                                <p>Username</p>
                                <button className="btn btn-primary" type="button">Contact</button>
                            </div>
                            <div className='d-flex flex-column gap-2' style={{ flex: "2 2 auto" }}>
                                <button className="btn btn-primary" type="button">Contact</button>
                                <button className="btn btn-primary" type="button">Contact</button>
                            </div>
                        </div>
                        <div className="card-body d-flex flex-column gap-3">
                            <div style={{ flex: "1 1 100px" }}>
                                <div className="form-floating h-100 mb-3">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100%" }}></textarea>
                                    <label for="floatingTextarea2">Comments</label>
                                </div>
                            </div>
                            <button className="btn btn-primary w-100" type="button">Download</button>
                            <div className="d-flex gap-3" style={{ flex: "1 1 0" }}>
                                <div style={{ flex: "3 3 0" }}>
                                    <div className="form-floating h-100 mb-3">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100%" }}></textarea>
                                        <label for="floatingTextarea2">Comments</label>
                                    </div>
                                </div>
                                <div className='d-flex flex-column gap-2' style={{ flex: "1 1 0" }}>
                                    <button className="btn btn-primary" type="button">Contact</button>
                                    <button className="btn btn-primary" type="button">Contact</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >)
}

export default VerificationRequests;
