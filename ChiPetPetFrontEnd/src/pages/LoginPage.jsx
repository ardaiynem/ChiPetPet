import { Container, Button, Form, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const { isAuthenticated, login, logout, userDetails } = useAuth();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegister, setIsRegister] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login_register/login/", {
        username: email,
        password: password,
      })
      .then((res) => {
        login(res.data.user_info);
      })
      .catch((e) => {
        if (e.response.status == 401) {
          console.log("Invalid credentials");
          setIsInvalid(true);
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login_register/register/", {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        if (e.response.status == 400) {
          console.log("Invalid credentials");
        }
      });
  };

  return (
    <>
      {isRegister ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <button
            onClick={() => {
              setIsRegister(false);
            }}
          >
            Login
          </button>
          <Container className="w-auto">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center mb-3">
                  <h1 className="d-inline-block">ChiPetPet</h1>
                </div>
                <Form
                  onSubmit={handleRegister}
                  style={{ boxShadow: "10px grey" }}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Last name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
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
      ) : (
        <div className="h-100 d-flex justify-content-center align-items-center">
          <button
            onClick={() => {
              setIsRegister(true);
            }}
          >
            Register
          </button>
          <Container className="w-auto">
            {isInvalid && <div> Invalid credentials </div>}
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center mb-3">
                  <h1 className="d-inline-block">ChiPetPet</h1>
                </div>
                <Form onSubmit={handleLogin} style={{ boxShadow: "10px grey" }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
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
      )}
    </>
  );
}

export default LoginPage;
