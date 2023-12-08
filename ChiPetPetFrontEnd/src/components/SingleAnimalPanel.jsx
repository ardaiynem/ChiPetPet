import { Card, Button, Row, Col, Pagination, Dropdown, Stack } from "react-bootstrap";
import catImg from "../assets/cat1.jpeg";

function SingleAnimalPanel() {
    let animal = [
        "Catto1"
        , "Catto2"
        , "Catto3"
        , "Catto4"
        , "Catto5"
        , "Catto6"
    ]

    return (
        <>
            <div className="p-0">
                <Button className="position-relative top-2 start-2">
                    Back
                </Button>
                <div className="d-flex w-70 ms-3 mt-3 flex-column flex-wrap">

                    <img src={catImg} style={{ objectFit: "cover" }} />

                </div>
            </div>
        </>
    )
}

export default SingleAnimalPanel;