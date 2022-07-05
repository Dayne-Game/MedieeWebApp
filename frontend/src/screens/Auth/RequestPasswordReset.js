import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { resetPasswordRequest } from "../../actions/userActions";
import { USER_PASSWORD_RESET_RESET } from "../../constants/userConstants";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, success, reset } = userPasswordReset;

  useEffect(() => {
    if (success) {
      setMessage("Password reset link sent to your email account");
      dispatch({ type: USER_PASSWORD_RESET_RESET });
    }
  });

  const submitRequest = (e) => {
    e.preventDefault();
    dispatch(resetPasswordRequest(email));
  };

  return (
    <FormContainer>
      <h1>Forgotten Password?</h1>
      <p>Enter your email to reset your password</p>
      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitRequest}>
        <Form.Group controlId="email" className="mb-2 login-control">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-form-control"
          ></Form.Control>
        </Form.Group>
        <div className="d-grid">
          <Button type="submit" className="login-submit-button">
            Sign In
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default RequestPasswordReset;
