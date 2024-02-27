import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from '../../src/components/SignupForm'

test('renders SignupForm correctly', () => {
  render(<SignupForm />)
  
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

