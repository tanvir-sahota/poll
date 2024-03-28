import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuizQuestionDetails from '../components/quiz/QuizQuestionDetails';
import { useNavigate } from 'react-router-dom';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('QuizQuestionDetails', () => {
  it('renders question details correctly', () => {
    const question = {
      question: 'Give me an answer',
      options: ['A', 'B', 'C'],
      answers: ['A'],
      questionType: 'Multiple Choice'
    };

    const classID = 'class 1'; 

    const { getByText } = render(<QuizQuestionDetails question={question} classID={classID} />);

    expect(getByText(question.question)).toBeInTheDocument();
    expect(getByText('Options:')).toBeInTheDocument();
    expect(getByText('A,B,C')).toBeInTheDocument();
    expect(getByText('Answer(s):')).toBeInTheDocument();
    expect(getByText('A')).toBeInTheDocument();
    expect(getByText('Multiple Choice')).toBeInTheDocument();
  });

  it('calls useNavigate with correct parameters when HOST button is clicked', () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const question = {
      question: 'Give me an answer',
      options: ['A', 'B', 'C'],
      answers: ['A'],
      questionType: 'Multiple Choice'
    };

    const classID = 'class 1';
    localStorage.setItem('user',JSON.stringify({ username: 'user' }))

    const { getByText } = render(<QuizQuestionDetails question={question} classID={classID} />);

    const hostButton = getByText('HOST');
    fireEvent.click(hostButton);


    expect(useNavigate).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/user/admin', {
      state: {
        currentClassID: classID,
        currentQuestion: question
      }
    });
  });
});
