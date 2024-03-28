import React from 'react';
import { render } from '@testing-library/react';
import ClassroomDropdown from '../components/classroom/ClassroomDropdown';

// Mocking the useQuestionContext hook
jest.mock('../hooks/useQuestionContext', () => ({
  useQuestionContext: jest.fn()
}));

describe('ClassroomDropdown', () => {
  it('renders questions correctly', async () => {
    // Mocking data for the context
    const questionsMock = [
      { question: 'Question 1' },
      { question: 'Question 2' },
    ];
    
    // Mocking the response from fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(questionsMock),
    });

    // Render the component
    const { findByText } = render(<ClassroomDropdown classID="class 1" />);

    // Check if the questions are rendered
    for (const question of questionsMock) {
      const questionElement = await findByText(question.question);
      expect(questionElement).toBeInTheDocument();
    }
  });
});
