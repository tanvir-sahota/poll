import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClassroomForm from "../components/forms/ClassroomForm";
import { ClassroomContextProvider } from "../context/ClassroomContext";

test('renders ClassroomForm component', () => {
  render(
    <ClassroomContextProvider>
      <ClassroomForm />
    </ClassroomContextProvider>
  );

  const addButton = screen.getByRole('button');

  expect(addButton).toBeInTheDocument();
});

test('handles form submission', async () => {
  // Mock fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  const mockCallback = jest.fn()
  render(
    <ClassroomContextProvider>
      <ClassroomForm onSubmit={mockCallback()}/>
    </ClassroomContextProvider>
  );

  const createButton = screen.getByRole('button');
  fireEvent.click(createButton);
  
  expect(mockCallback).toHaveBeenCalled()
  expect(screen.getByText('Create new classroom')).toBeInTheDocument()
  expect(screen.getByText('Cancel')).toBeInTheDocument()
  expect(screen.getByText('Create classroom')).toBeInTheDocument()

});
