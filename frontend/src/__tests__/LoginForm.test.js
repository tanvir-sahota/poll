import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import LoginForm from '../../src/components/LoginForm';
import { AuthContextProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';

const mockUser = {
  _id: "user_id",
  username: "newusername",
  password: "newpassword",
};

const url = `${process.env.REACT_APP_URL}api/users/id/${mockUser._id}`;

test('renders LoginForm correctly', () => {
  render(<AuthContextProvider><LoginForm /></AuthContextProvider>);
  
  // Testing elements in form
  expect(screen.getByText('Log in')).toBeInTheDocument();
  expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
});

beforeEach(() => {
  fetchMock.restore();
});

describe("Ensure form submits with correct data", () => {
  test("Ensure GET request sent after submit is clicked", async () => {
    fetchMock.mock(url, JSON.stringify([mockUser]));
    await act(async () => {
      render(<AuthContextProvider><LoginForm /></AuthContextProvider>);
    });

    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    // Simulate user input
    userEvent.type(usernameInput, 'newusername');
    userEvent.type(passwordInput, 'newpassword');

    // Simulate form submission
    userEvent.click(loginButton);

    // Wait for the GET request to be made
    await waitFor(() => {
      expect(fetchMock.called(url)).toBe(true);
    });
  });
});
