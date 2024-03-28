import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useParams, useNavigate } from 'react-router-dom';
import ConnectionPage from '../ConnectionPage';

// Mock useParams and useNavigate
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock socket.io
const mockSocket = {
  emit: jest.fn(),
  on: jest.fn(),
};

describe('ConnectionPage component', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
    // Mock useParams and useNavigate
    useParams.mockReturnValue({ lecturer: 'somelecturer' });
    useNavigate.mockReturnValue(jest.fn());

    // Render the component
    const { container } = render(<ConnectionPage socket={mockSocket} />);

    expect(container).toBeInTheDocument();
  });

  test('joins room and connects to room on mount', () => {
    // Mock useParams and useNavigate
    useParams.mockReturnValue({ lecturer: 'somelecturer' });
    useNavigate.mockReturnValue(jest.fn());

    // Render the component
    render(<ConnectionPage socket={mockSocket} />);

    // Assert that socket.emit is called to join room and connect to room
    expect(mockSocket.emit).toHaveBeenCalledWith('join-room', 'somelecturer');
    expect(mockSocket.emit).toHaveBeenCalledWith('connect-to-room', 'somelecturer', expect.any(Function));
  });

});