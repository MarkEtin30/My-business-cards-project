import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../contexts/UserListContext";
import { loginUser } from "../services/api";

import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();
  const { users, setCurrentLoggedUser, currentLoggedUser } =
    useContext(UserListContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    Email: "",
    Password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      setToken(response.token);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "22rem" }}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default LoginPage;
