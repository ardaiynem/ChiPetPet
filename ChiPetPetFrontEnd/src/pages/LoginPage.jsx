import { Container, Button, Form, Card } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useAlert } from "../AlertContext";
import axios from "axios";

function LoginPage() {
  const { isAuthenticated, login, logout, userDetails } = useAuth();
  const { setTimedAlert } = useAlert();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRegister, setIsRegister] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleForgotPassword = (e) => {
    
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login_register/reset_password/", {
        username: username,
      })
      .then((res) => {
        setUsername("");
        setTimedAlert(
          "Check your mailbox to reset your password.",
          "success",
          3000
        );
        setUsername("");
        setForgotPassword(false);
      })
      .catch((e) => {
        if (e.response.status == 401) {
          setIsInvalid(true);
          setTimedAlert("Invalid credentials", "error", 3000);
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login_register/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        login(res.data.user_info);
        setTimedAlert("Login successful", "success", 3000);
      })
      .catch((e) => {
        if (e.response.status == 401) {
          setIsInvalid(true);
          setTimedAlert("Invalid credentials", "error", 3000);
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
        setTimedAlert("Register successful", "success", 3000);
        setPassword("");
        setIsRegister(false);
      })
      .catch((e) => {
        if (e.response.status == 400) {
          setTimedAlert("Invalid informations", "error", 3000);
        }
      });
  };

  return (
    <>
      {isRegister ? (
        <div className="h-100 d-flex justify-content-center align-items-center">
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
                    Register
                  </Button>
                  <Button
                    className="mt-3"
                    onClick={() => {
                      setIsRegister(false);
                    }}
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      ) : (
        <div>
          {forgotPassword ? (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Container className="w-auto">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-center mb-3">
                      <h1 className="d-inline-block">ChiPetPet</h1>
                    </div>
                    <Form
                      onSubmit={handleForgotPassword}
                      style={{ boxShadow: "10px grey" }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                        />
                      </Form.Group>
                      <Button className="mt-3 w-100" type="submit">
                        Send password reset link
                      </Button>
                      <Button
                        className="mt-3 w-100"
                        onClick={() => {
                          setForgotPassword(false);
                        }}
                      >
                        Login
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <Container className="w-auto">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-center mb-3">
                      <h1 className="d-inline-block">ChiPetPet</h1>
                    </div>
                    <Form
                      onSubmit={handleLogin}
                      style={{ boxShadow: "10px grey" }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Login
                      </Button>
                      <Button
                        className="mt-3 w-100"
                        onClick={() => {
                          setIsRegister(true);
                        }}
                      >
                        Don't have an account? Register
                      </Button>
                      <Button
                        className="mt-3 w-100"
                        onClick={() => {
                          setForgotPassword(true);
                        }}
                      >
                        Forgot password
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default LoginPage;
