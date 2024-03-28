import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MCQButton from '../components/buttons/MCQButton';

describe('MCQButton component', () => {
  it('renders button with option text and default background color when not pressed', () => {
    const option = 'Option 1';
    const position = 0;
    const pressed = false;
    const handleMCQ = jest.fn(); 

    // Render MCQButton component
    const { getByText, container } = render(
      <MCQButton
        option={option}
        position={position}
        pressed={pressed}
        handleMCQ={handleMCQ}
      />
    );

    // Assert that the button text is rendered correctly
    expect(getByText(option)).toBeInTheDocument();

    // Assert that the button has the correct class and default background color
    const button = container.querySelector('button');
    expect(button).toHaveClass('unpOption');
    expect(button).not.toHaveStyle('background-color: red'); 
  });

  it('renders button with red background color when pressed', () => {
    // Set up test data
    const option = 'Option 1';
    const position = 0;
    const pressed = true;
    const handleMCQ = jest.fn(); // Mock handleMCQ function

    // Render MCQButton component
    const { container } = render(
      <MCQButton
        option={option}
        position={position}
        pressed={pressed}
        handleMCQ={handleMCQ}
      />
    );

    // Assert that the button has the correct class and red background color
    const button = container.querySelector('button');
    expect(button).toHaveClass('pOption');
    expect(button).toHaveStyle('background-color: red');
  });

  it('calls handleMCQ function when button is clicked', () => {
    const option = 'Option 1';
    const position = 0;
    const pressed = false;
    const handleMCQ = jest.fn(); 

    const { getByText } = render(
      <MCQButton
        option={option}
        position={position}
        pressed={pressed}
        handleMCQ={handleMCQ}
      />
    );

    // Simulate button click
    fireEvent.click(getByText(option));

    // Assert that handleMCQ function is called with the correct arguments
    expect(handleMCQ).toHaveBeenCalledWith(option, position);
  });
});
