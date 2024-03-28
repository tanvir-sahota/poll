import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../src/components/LoginForm';
import { AuthContextProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';

describe('LoginForm component', () => {
  test('renders LoginForm correctly', () => {
    render(<AuthContextProvider><LoginForm /></AuthContextProvider>);
    
    // Testing elements in form
    expect(screen.queryAllByText('Log in')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  describe("Ensure form submits with correct data", () => {
    test("Ensure GET request sent after submit is clicked", async () => {
      const mockCallback = jest.fn()
      render(<AuthContextProvider><LoginForm onSubmit={mockCallback()}/></AuthContextProvider>);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      const passwordInput = screen.getByPlaceholderText('Enter password');
      const loginButton = screen.getByRole('button', { name: 'Log in' });

      // Simulate user input
      userEvent.type(usernameInput, 'newusername');
      userEvent.type(passwordInput, 'newpassword');

      // Simulate form submission
      fireEvent.click(loginButton)

      // Wait for the GET request to be made
      expect(mockCallback).toHaveBeenCalled()
    });
  });
});
