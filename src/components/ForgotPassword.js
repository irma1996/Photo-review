import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    setError(null);

    try {
      //try to log in
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess(true);
    } catch (e) {
      setError("Something went wrong. Please check your email address.");
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
                {" "}
                <strong>Forgot Password </strong>
              </Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              {!success && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>

                  <Button className="button" disabled={loading} type="submit">
                    Reset Password{" "}
                  </Button>
                </Form>
              )}
              {success && (
                <>
                  <Alert variant="success">
                    Please check your email for further instructions on how to
                    reset your password.
                  </Alert>

                  <Link to="/login" className="btn btn-primary w-100 mt-3 ">
                    Log in
                  </Link>
                </>
              )}
            </Card.Body>
          </Card>
          <div className="text-center size">
            Forgott your password? <Link to="/signup">Log in</Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
