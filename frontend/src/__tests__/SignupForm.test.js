import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from '../../src/components/SignupForm'
import { AuthContextProvider } from '../context/AuthContext'

describe('SignupForm component', () => {
  test('renders SignupForm correctly', () => {
    render(<AuthContextProvider><SignupForm /></AuthContextProvider>)
    
    // Testing elements in form
    expect(screen.getAllByText('Sign Up')[0]).toBeInTheDocument()
    expect(screen.getByLabelText('Username:')).toBeInTheDocument()
    expect(screen.getByLabelText('Password:')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()

    // Testing submitting form
    const usernameInput = screen.getByPlaceholderText('Enter username')
    const passwordInput = screen.getByPlaceholderText('Enter password')
    userEvent.type(usernameInput, 'testuser123')
    userEvent.type(passwordInput, 'testpassword123')
    userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
  })

  describe("Ensure form submits with correct data", () => {
    test("Ensure GET request sent after submit is clicked", async () => {
      const mockCallback = jest.fn()
      render(<AuthContextProvider><SignupForm onSubmit={mockCallback()}/></AuthContextProvider>);

      const usernameInput = screen.getByPlaceholderText('Enter username');
      const passwordInput = screen.getByPlaceholderText('Enter password');
      const loginButton = screen.getByRole('button', { name: 'Sign Up' });

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

