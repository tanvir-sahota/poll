import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../context/AuthContext';

jest.mock('../hooks/useLogout', () => ({
  useLogout: () => ({
    logout: jest.fn(),
  }),
}));


describe('Navbar Component', () => {
  test('renders Navbar component with logged-in user', () => {
    render(
      <AuthContextProvider value={{ user: { username: 'testUser' } }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContextProvider>
    );

    const usernameElement = screen.getByText('testUser');
    expect(usernameElement).toBeInTheDocument();

    const logoutButton = screen.getByText('Log out');
    expect(logoutButton).toBeInTheDocument();
  });

  test('renders Navbar component with logged-out user', () => {
    render(
      <AuthContextProvider value={{ user: null }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContextProvider>
    );

    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();

    const signupLink = screen.getByText('Signup');
    expect(signupLink).toBeInTheDocument();
  });

  test('clicking logout button calls logout function', () => {

    render(
      <AuthContextProvider value={{ user: { username: 'testUser' } }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </AuthContextProvider>
    );

    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});
