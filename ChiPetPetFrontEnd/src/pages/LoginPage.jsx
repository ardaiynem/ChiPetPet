import { Container, Button, Form, Card } from "react-bootstrap";

function LoginPage() {
    return (
        <div className="h-100 d-flex justify-content-center align-items-center">
            <Container className="w-auto">
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-center mb-3">
                            <h1 className="d-inline-block">ChiPetPet</h1>
                        </div>
                        <Form style={{ boxShadow: "10px grey" }}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </Container>
        </div>
    )
}

export default LoginPage;