import { useState } from "react";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new user NOT added:", json);
    }
    if (response.ok) {
      console.log("new user added:", json);
    }
  };

  return (
    <div
      className="form-container"
      style={{ display: "block", width: 700, padding: 30 }}
    >
      <Form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <div>
                <Form.Control
                  placeholder="Enter username"
                  type="text"
                  {...field}
                />
                {errors.username && <div className="error">{errors.username.message}</div>}
              </div>
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <div>
                <Form.Control
                  placeholder="Enter password"
                  type="password"
                  {...field}
                />
                {errors.password && <div className="error">{errors.password.message}</div>}
              </div>
            )}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        {errors.apiError && <div className="error">{errors.apiError.message}</div>}
      </Form>
    </div>
  );
};

export default SignupForm;
