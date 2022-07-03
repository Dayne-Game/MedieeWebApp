import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/staff/search/${keyword}`);
    } else {
      history.push("/staff");
    }
  };

  return (
    <Col md={4} sm={8}>
      <Form className="search" onSubmit={submitHandler}>
        <input type="text" className="form-control" onChange={(e) => setKeyword(e.target.value)} placeholder="Search Staff Member..." /> <button className="btn btn-info">Search</button>{" "}
      </Form>
    </Col>
  );
};

export default Searchbox;
