import { Dropdown, Pagination, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { PanelContext } from "../contexts/panelContext";
import BlogPage from "./BlogPage";

const PetBlog = () => {
    const { currentPanel, setCurrentPanel } = useContext(PanelContext);

    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const postObjects = [
        {
            postName: "necdet haliya siciyor",
            postId: 0,
        },
        {
            postName: "köpek haliya siciyor",
            postId: 1,
        },
        {
            postName: "kedi haliya siciyor",
            postId: 2,
        },
    ]

    const handleClickTableElement = (postObject) => {
        setCurrentPanel(<BlogPage postName={postObject.postName} postId={postObject.postName}/>)
    };

    return (
        <div className="p-5 w-100 h-100 d-flex flex-column gap-3">
            <div>
                <Button className="position-relative top-2 start-2" onClick={() => setCurrentPanel("back")}>
                    Back
                </Button>
            </div>
            <h1>Pet Blog</h1>
            <div className="d-flex w-100 justify-content-between">
                <Dropdown >
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex" style={{ flex: "1 1 0" }}>
                <div className="w-100">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postObjects.map((postObject, i) => (
                                    <tr key={i} onClick={() => handleClickTableElement(postObject)}>
                                        <th scope="row">{postObject.postId}</th>
                                        <td>{postObject.postName}</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Pagination size="lg">{items}</Pagination>
            </div>
        </div>

    )
}

export default PetBlog;