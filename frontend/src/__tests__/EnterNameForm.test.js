import { render, fireEvent, screen } from '@testing-library/react';
import EnterNameForm from '../components/EnterNameForm';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockParams = { lecturer: 'testLecturer' };

beforeEach(() => {
  useParams.mockReturnValue(mockParams);
});

test('handles form submission with empty username', () => {
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  render(<EnterNameForm socket={mockSocket} />);
  
  // Ensure that the welcome message is displayed
  expect(screen.getByText(`Welcome to ${mockParams.lecturer}'s poll!`)).toBeInTheDocument();

  // Input an empty username and submit the form
  fireEvent.click(screen.getByText('Continue'));

  // Expect the socket to emit the join-room event
  expect(mockSocket.emit).toHaveBeenCalledWith('join-room', mockParams.lecturer);

});

test('handles form submission with non-empty username', () => {
  const mockSocket = {
    emit: jest.fn(),
    on: jest.fn(),
  };
  render(<EnterNameForm socket={mockSocket} />);
  
  // Input a non-empty username and submit the form
  fireEvent.change(screen.getByPlaceholderText('Enter name (optional)'), { target: { value: 'TestUser' } });
  fireEvent.click(screen.getByText('Continue'));

  // Expect the socket to emit the join-room event
  expect(mockSocket.emit).toHaveBeenCalledWith('join-room', mockParams.lecturer);

  // Expect the switchPages function not to be called
  expect(window.location.href).not.toBe('/');
});
