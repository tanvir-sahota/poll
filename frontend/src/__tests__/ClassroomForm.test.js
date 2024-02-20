import React from 'react'
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import ClassroomForm from '../../src/components/forms/ClassroomForm'
import { ClassroomContextProvider } from '../context/ClassroomContext'

test('renders ClassroomForm correctly', () => {
    render(<ClassroomContextProvider><ClassroomForm /></ClassroomContextProvider>)
    
    // Testing elements in form
    expect(screen.getByRole('button')).toBeInTheDocument()
    //userEvent.click(screen.getByRole('button'))
   
    /*expect(screen.getAllByText('Create new classroom')[0]).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Create classroom' })).toBeInTheDocument()
  
    // Testing submitting form
    const usernameInput = screen.getByPlaceholderText('Enter name')
    userEvent.type(usernameInput, 'testclassroom')
    userEvent.click(screen.getByRole('button', { name: 'Create classroom' }))*/
  })