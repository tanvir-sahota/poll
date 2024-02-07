import { useState } from "react";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, password };

    const response = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log("new user NOT added:", json);
    }
    if (response.ok) {
      setError(null);
      setUsername("");
      setPassword("");
      console.log("new user added:", json);
    }
  };

  return (
    <div
      className="form-container"
      style={{ display: "block", width: 700, padding: 30 }}
    >
      <Form className="sign-up" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            placeholder="Enter username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        {error && <div className="error">{error}</div>}
      </Form>
    </div>
  );
};

export default SignupForm;
