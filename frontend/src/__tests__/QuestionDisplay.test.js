import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionDisplay from '../components/question/QuestionDisplay';
import { BrowserRouter } from 'react-router-dom';

describe('QuestionDisplay', () => {
  const mockGivenQuestion = {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5'],
    answers: ['4'],
    questionType: 'MCQ',
  };

  const mockInputData = {
    givenQuestion: mockGivenQuestion,
    isAdmin: false,
    socket: {on : jest.fn(),
        off : jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        emit:jest.fn()},
    lecturer: 'Teacher',
  };

  test('renders question and options for non-admin user', () => {
    const { getByText, getAllByRole } = render(<BrowserRouter><QuestionDisplay {...mockInputData} /></BrowserRouter>);
    
    // Check if the question is rendered
    const questionElement = getByText(mockGivenQuestion.question);
    expect(questionElement).toBeInTheDocument();

    // Check if all options are rendered
    const optionButtons = getAllByRole('button');
    expect(optionButtons).toHaveLength(mockGivenQuestion.options.length);
  });

  test('renders answers for admin user after clicking "Show Answers"', () => {
    const { getByText, getByRole } = render(<BrowserRouter><QuestionDisplay {...mockInputData} isAdmin={true} /></BrowserRouter>);

    // Click "Show Answers" button
    const showAnswersButton = getByText(/show answers/i);
    fireEvent.click(showAnswersButton);

    // Check if  answer  is rendered
    const answerButtons = getByRole('button', { name: '4' });
    expect(answerButtons).toBeInTheDocument();
  });
});
