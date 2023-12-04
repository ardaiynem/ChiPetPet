import { Container, Navbar, Button, Row, Stack } from "react-bootstrap";

function MainPage() {

    return (
        <>
            <Container fluid className="h-100 p-0">
                <Stack gap={0} className="h-100">
                    <Navbar expand="lg" bg="primary" className="flex-grow-0">
                        <Container>
                            <Navbar.Brand href="#">ChiPetPet</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <div className="p-0 flex-grow-1">
                        Second item
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default MainPage;