import React from 'react'
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Dashboard from '../../src/pages/Dashboard'
import { ClassroomContextProvider } from '../context/ClassroomContext'

test('renders Dashboard correctly', () => {
    render(<ClassroomContextProvider><Dashboard /></ClassroomContextProvider>)
    
    // Testing elements in form
    expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
  
})

 /* describe("Dashboard", () => {
    it("should have exact heading", () => {
      render(<Dashboard />);
  
      const mainHeading = screen.getByTestId("app-header-heading");
  
      expect(mainHeading.innerHTML).toBe("Productivity Tracker");
    });
  });*/