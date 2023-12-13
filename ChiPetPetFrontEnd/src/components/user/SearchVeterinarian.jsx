import { Card, Button, Dropdown } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../../contexts/panelContext";

function SearchVeterinarian() {

    const { currentPanel, setCurrentPanel } = useContext(PanelContext);


    const [vets, setVets] = useState([
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
        {
            id: 1,
            name: "catto",
            city: "new york",
            expertise: "dogs"
        },
    ]);

    const [selectedVet, setSelectedVet] = useState(null);

    return (
        <div className="p-0" style={{ width: "100%" }}>
            <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                Back
            </Button>
            <div className="d-flex">
                <div className="" style={{ flex: "1 1 0" }}>
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
                                <th scope="col">Name</th>
                                <th scope="col">City</th>
                                <th scope="col">Expertise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vets.map((vet) => (
                                    <tr onClick={() => { setSelectedVet(vet) }}>
                                        <th scope="row">{vet.name}</th>
                                        <td>{vet.city}</td>
                                        <td>{vet.expertise}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-end" style={{ flex: "1 1 0" }}>
                    <div className="card" style={{ width: "400px", visibility: selectedVet ? "visible" : "hidden" }}>
                        <div className="d-flex p-3 justify-content-center">
                            <img src={catImg} className="card-img-top" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{selectedVet?.name}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button">Button</button>
                                <button className="btn btn-primary" type="button">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default SearchVeterinarian;