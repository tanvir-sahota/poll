import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectToRoomForm from '../components/ConnectToRoomForm';
import { BrowserRouter as Router } from 'react-router-dom';

describe('ConnectToRoomForm component', () => {
  test('renders form elements correctly', () => {
    render(<Router><ConnectToRoomForm /></Router>);

    expect(screen.getByText('Join Poll')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connect' })).toBeInTheDocument();
  });

  test('handles form submission with valid input', async () => {
    render(<Router><ConnectToRoomForm /></Router>);

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testUser' } });
    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

  });

  test('handles form submission with empty username', async () => {
    render(<Router><ConnectToRoomForm /></Router>);

    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

    expect(screen.getByText('Lecturer username not inputted')).toBeInTheDocument();
  });
});
