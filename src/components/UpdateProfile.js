import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile = () => {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, updateProfile, updatePassword, updateEmail } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    //have you entered sam password?
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("The password does not match");
    }

    setError(null);
    const updateTasks = [];

    try {
      //Updating in progress
      setLoading(true);

      if (displayNameRef.current.value !== currentUser.displayName) {
        updateTasks.push(updateProfile(displayNameRef.current.value));
      }

      if (emailRef.current.value !== currentUser.email) {
        updateTasks.push(updateEmail(emailRef.current.value));
      }

      //wait for all updateTasks to finish
      await Promise.all(updateTasks);

      if (passwordRef.current.value) {
        await updatePassword(passwordRef.current.value);
      }

      //  Profit
      setMessage("Profile successfully updated");
      setLoading(false);
    } catch (e) {
      setError("Error updating profile. Try logging out and in again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    required
                  />
                </Form.Group>
                <Form.Group id="displayName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={displayNameRef}
                    defaultValue={currentUser.displayName}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} />
                </Form.Group>
                <Form.Group id="confirm-password">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control type="password" ref={confirmPasswordRef} />
                </Form.Group>

                <Button disabled={loading} type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
