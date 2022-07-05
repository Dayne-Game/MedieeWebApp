import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { resetPassword } from "../../actions/userActions";
import { USER_PASSWORD_RESET_RESET } from "../../constants/userConstants";

const PasswordReset = ({ match, history }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userId = match.params.id;
  const token = match.params.token;

  const dispatch = useDispatch();

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, success, reset } = userPasswordReset;

  useEffect(() => {
    if (success) {
      setMessage("Reset Successful");
      dispatch({ type: USER_PASSWORD_RESET_RESET });
      history.push("/login");
    }
  });

  const submitRequest = (e) => {
    e.preventDefault();
    dispatch(resetPassword(userId, token, password));
  };

  return (
    <FormContainer>
      <h1>Forgotten Password?</h1>
      <p>Enter your email to reset your password</p>
      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitRequest}>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default PasswordReset;
