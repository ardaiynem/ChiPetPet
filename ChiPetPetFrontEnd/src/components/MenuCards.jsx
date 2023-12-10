import { Card, Button } from "react-bootstrap";

function MenuCards() {
    let cardHeaders = ["Search Pet"
        , "Search Veterinarian"
        , "Search Shelter"
        , "Adoption Application"
        , "Appointments"
        , "My Pet"
        , "Pet Blog"
        , "Profile"]

    return (
        <>
            <div className="p-0">
                <div className="d-flex w-50 ms-3 mt-3 flex-column flex-wrap" style={{ maxHeight: "90vh" }}>
                    {
                        cardHeaders.map(name => (
                            <Card className="mb-3 ms-3 flex-shrink-1" style={{ height: "200px", width: "400px" }}>
                                <Card.Header as="h5">{name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Special title treatment</Card.Title>
                                    <Card.Text>
                                        With supporting text below as a natural lead-in to additional content.
                                    </Card.Text>
                                    <Button>Select</Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            </div>
        </>
    )
}

export default MenuCards;