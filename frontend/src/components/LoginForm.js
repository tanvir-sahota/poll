import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm();

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
      console.log("NOT Logged in: ", json);
      setError("username", { message: json.error })
    }
    if (response.ok) {
      console.log("Logged in: ", json);
    }
  };

  return (
    <div
      className="form-container"
      style={{ display: "block", width: 700, padding: 30 }}
    >
      <Form className="login" onSubmit={handleSubmit(onSubmit)}>
        <h1>Log in</h1>
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
          Log in
        </Button>
        {errors.apiError && <div className="error">{errors.apiError.message}</div>}
      </Form>
    </div>
  );
};

export default LoginForm;