import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BackButton from '../components/buttons/BackButton';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('BackButton Component', () => {
  test('Clicking on button triggers navigate function with -1', () => {
    const mockNavigate = jest.fn();
    // Mock the useNavigate hook
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    const { getByText } = render(<BackButton />);

    // Simulate a click on the button
    fireEvent.click(getByText('navigate_before'));

    // Assert that the navigate function is called with -1
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
