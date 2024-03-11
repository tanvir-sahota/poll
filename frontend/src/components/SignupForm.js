import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from "react-bootstrap";

const SignupForm = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm();
  const { dispatch } = useAuthContext()

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_URL}api/users/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("new user NOT added:", json);
      setError("username", { message: json.error })
    }
    if (response.ok) {
      console.log("new user added:", json);

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
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
          <Form.Label htmlFor="username">Username:</Form.Label>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <div>
                <Form.Control
                  id="username"
                  placeholder="Enter username"
                  type="text"
                  {...field}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.username && errors.username.message}
                </Form.Control.Feedback>
              </div>
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <div>
                <Form.Control
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  {...field}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid" className="text-danger">
                  {errors.password && errors.password.message}
                </Form.Control.Feedback>
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
