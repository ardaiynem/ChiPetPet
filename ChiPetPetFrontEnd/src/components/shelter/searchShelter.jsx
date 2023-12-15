import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import catImg from "../../assets/cat1.jpeg";

import { PanelContext } from "../../contexts/panelContext";
import { useState, useEffect, useContext } from "react";
import SingleAnimalPanel from "../SingleAnimalPanel";
import { getAllShelters } from "../../apiHelper/backendHelper";

function SearchShelter() {


    const { currentPanel, setCurrentPanel } = useContext(PanelContext);
    const [page, setPage] = useState(1)
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        // Fetch pets data from the backend when the component mounts
        getAllShelters()
        .then((res) => {
            setShelters(res.data.shelters);
        })
        .catch((err) => {
            setTimedAlert("Error retrieving shelters", "error", 3000);
        });

    }, []);
    

    let items = [];
    const shelterlPerPage = 6
    let pageAmount = Math.floor(shelters.length / shelterlPerPage) + 1
    for (let number = 1; number <= pageAmount; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <>
            <div className="p-0 w-100 h-100">
                <h1>Search Shelters </h1>
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
                <div className="d-flex w-70 ms-3 mt-3 flex-column flex-wrap" style={{ height: "700px" }}>
                    {
                        (shelters.slice((page - 1) * shelterlPerPage, (page - 1) * shelterlPerPage + 6)).map(shelter => (
                            <Card key={shelter.user_id} className="mb-3 me-3" style={{ maxWidth: "576px" }}>
                                <Row className="no-gutters">
                                    <Col xs={4} className="d-flex">
                                        <Card.Img src={shelter.photo} style={{ objectFit: "cover" }} />
                                    </Col>
                                    <Col xs={8}>
                                        <Card.Body>
                                            <Card.Title>{shelter.username}</Card.Title>
                                            <Card.Text>
                                                {shelter.description}
                                            </Card.Text>
                                            <Button variant="primary" onClick={()=>setCurrentPanel(<SingleAnimalPanel petid = {shelter.pet_id}/>)}>Go somewhere</Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    {/* <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="..." class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                            </div>
                        </div>
                        </div> */}
                </div>
                <Pagination size="lg">{items}</Pagination>
            </div>
        </>
    )
}

export default SearchShelter;