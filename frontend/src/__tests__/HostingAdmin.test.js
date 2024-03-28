import React from 'react';
import { render, screen,fireEvent, waitFor, act, getByTestId } from '@testing-library/react';
import HostingAdmin from '../components/HostingAdmin';
import { useQuestionContext } from "../hooks/useQuestionContext";
import { useQuizzesContext } from "../hooks/useQuizzesContext";
import { useNavigate } from "react-router-dom";

// Mocking useQuestionContext hook
jest.mock("../hooks/useQuestionContext");
jest.mock("../hooks/useQuizzesContext");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

describe('HostingAdmin', () => {
  beforeEach(() => {
    useQuestionContext.mockReturnValue({questions:[
        {
        _id: '1',
        question: 'Give me an answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'},
        {_id: '2',
        question: 'Give me another answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'}
]});
    useQuizzesContext.mockReturnValue({ quiz: { id: 'quizId' } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const inputData = {
        socket: {on : jest.fn(),
            off : jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            emit:jest.fn()},
      currentQuestion: { _id: '1', question: {
        question: 'Give me an answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'
      },
      lecturer: 'Lecturer 1'
    }
    };
    const { getByText } = render(<HostingAdmin {...inputData} />);
    expect(getByText('Give me an answer')).toBeInTheDocument();
    expect(getByText('Student Responses')).toBeInTheDocument();
    expect(getByText('Save Quiz')).toBeInTheDocument();
    expect(getByText('A')).toBeInTheDocument();
    expect(getByText('B')).toBeInTheDocument();
    expect(getByText('C')).toBeInTheDocument();

  });

  it('calls handleNext when "NEXT QUESTION" button is clicked', () => {
    const handleNextMock = jest.fn();
    // useNavigate.mockReturnValue(handleNextMock);
    const inputData = {
        socket: {on : jest.fn(),
            off : jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            emit:jest.fn()},
      currentQuestion: { _id: '1', question: {
        question: 'Give me an answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'
      }},
      lecturer: 'Lecturer 1'
    };
    const { getByTestId } = render(<HostingAdmin {...inputData} onSubmit={handleNextMock()}/>);
    fireEvent.click(getByTestId('nextButton'));
    expect(handleNextMock).toHaveBeenCalled();
  });

  it('calls handlePrev when "PREVIOUS QUESTION" button is clicked', () => {
    const handlePrevMock = jest.fn();
    const inputData = {
        socket: {on : jest.fn(),
            off : jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            emit:jest.fn()},
      currentQuestion: { _id: '1', question: {
        question: 'Give me an answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'
      }},
      lecturer: 'Lecturer 1'
    };
    const { getByTestId } = render(<HostingAdmin {...inputData} onSubmit={handlePrevMock()} />);
    fireEvent.click(getByTestId('prevButton'));
    expect(handlePrevMock).toHaveBeenCalled();
  });

  it('calls handleSaveQuiz when "Save Quiz" button is clicked', async () => {
    const handleSaveQuizMock = jest.fn();
    const inputData = {
      socket: {on : jest.fn(),
        off : jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        emit:jest.fn()
    },
      currentQuestion: { _id: '1', question: {
        question: 'Give me an answer',
        options: ['A', 'B', 'C'],
        answers: ['A'],
        questionType: 'Multiple Choice'
      }},
      lecturer: 'Lecturer 1'
    };
    const { getByText } = render(<HostingAdmin {...inputData} onSubmit={handleSaveQuizMock()}/>);
    fireEvent.click(getByText('Save Quiz'));
    await waitFor(() => expect(handleSaveQuizMock).toHaveBeenCalled());
  });
});
