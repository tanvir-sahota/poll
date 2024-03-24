import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer component', () => {
  test('renders developer information correctly', () => {
    render(<Footer />);
    
    // Assert that the developer information is rendered correctly
    const developerInfoElement = screen.getByText('Developed by Marshall & Co, 2024');
    expect(developerInfoElement).toBeInTheDocument();
  });
});
