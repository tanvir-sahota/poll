import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectToRoomForm from '../components/ConnectToRoomForm';

describe('ConnectToRoomForm component', () => {
  test('renders form elements correctly', () => {
    render(<ConnectToRoomForm />);

    expect(screen.getByText('Join Poll')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Connect' })).toBeInTheDocument();
  });

  test('handles form submission with valid input', async () => {
    render(<ConnectToRoomForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testUser' } });
    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

  });

  test('handles form submission with empty username', async () => {
    render(<ConnectToRoomForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Connect' }));

    expect(screen.getByText('Lecturer username not inputted')).toBeInTheDocument();
  });
});
