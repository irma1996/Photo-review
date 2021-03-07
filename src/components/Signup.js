import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { singup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    //have you entered sam password?
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("The password does not match");
    }

    setError(null);

    try {
      //try to log in
      setLoading(true);
      await singup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <Card.Title>
                <strong>Sig Up</strong>
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>

                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>

                <Form.Group id="confirm-password">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={confirmPasswordRef}
                    required
                  />
                </Form.Group>
                <Button className="button" disabled={loading} type="submit">
                  Create Account
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center size">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
