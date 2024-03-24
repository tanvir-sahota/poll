import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClassroomForm from '../../src/components/forms/ClassroomForm'
import { ClassroomContextProvider } from '../context/ClassroomContext'

describe('ClassroomForm component', () => {
  test('renders ClassroomForm correctly', () => {
      render(<ClassroomContextProvider><ClassroomForm /></ClassroomContextProvider>)
      fireEvent.click(screen.getByRole('button'))   // need to click yellow button to show the modal

      expect(screen.getByText('Create new classroom')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Create classroom' })).toBeInTheDocument()
    
    })

  describe("Ensure form submits with correct data", () => {
    test("Ensure POST request sent after submit (with correct info) is clicked", async () => {
      const mockCallback = jest.fn()
      render(<ClassroomContextProvider><ClassroomForm onSubmit={mockCallback()}/></ClassroomContextProvider>);
      fireEvent.click(screen.getByRole('button'))   // need to click yellow button to show the modal

      const nameInput = screen.getByPlaceholderText('Enter name')
      const createButton = screen.getByRole('button', { name: 'Create classroom' });

      // Simulate user input
      userEvent.type(nameInput, 'Test Classroom');

      // Simulate form submission
      fireEvent.click(createButton)

      // Wait for the POST request to be made
      expect(mockCallback).toHaveBeenCalled()
    });
  });
})