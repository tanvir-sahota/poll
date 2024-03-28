import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CheckLogoutUsed = () => {
  return (
    <h3>success logout</h3>
  )
}
const CheckNavigateUsed = () => {
}

// mock models

const mockUser = {
  username: "username",
  password: "password",
}


// mock context

jest.mock('../hooks/useAuthContext', () => ({
  useAuthContext: () => ({user: mockUser})
}))

jest.mock('../hooks/useAuthContext', () => ({
  useAuthContext: () => ({user: mockUser})
}))


// mock functions

jest.mock('../hooks/useLogout', () => ({
  useLogout: () => ({logout: CheckLogoutUsed}),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(CheckNavigateUsed()),
  // useNavigate: () => jest.fn(),
}));


// render components

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  )
}




// tests

describe('Appearance tests (logged-in user)', () => {
  test('for pollname', () => {
    render(MockNavbar());

    const pollName = screen.getByText('PollAnywhere');
    expect(pollName).toBeInTheDocument();

  });
  test('for menu', () => {
    render(MockNavbar());

    const menu = screen.queryByRole('button');
    expect(menu).toBeInTheDocument();
  });
  test('for menu items', async () => {
    render(MockNavbar());
    const menu = screen.queryByRole('button');
    
    await act(async () => {    
      fireEvent.click(menu)
    })

    const dashboardText = screen.getByText('Dashboard')
    const logOutText = screen.getByText('Log out')
    const qrCodeText = screen.getByText('QR code')

    expect(dashboardText).toBeInTheDocument()
    expect(logOutText).toBeInTheDocument()
    expect(qrCodeText).toBeInTheDocument()
  });
});