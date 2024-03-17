import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../src/components/LoginForm';
import { AuthContextProvider } from '../context/AuthContext';

test('renders LoginForm correctly', () => {
  render(<AuthContextProvider><LoginForm /></AuthContextProvider>);
  
  // Testing elements in form
  expect(screen.getAllByText('Log in')[0]).toBeInTheDocument();
  expect(screen.getByLabelText('Username:')).toBeInTheDocument();
  expect(screen.getByLabelText('Password:')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
});
