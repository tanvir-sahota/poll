import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionDetails from '../components/QuestionDetails';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuestionContextProvider } from "../context/QuestionContext"

jest.mock('../hooks/useQuestionContext', () => ({
  useQuestionContext: jest.fn()
}));

describe('QuestionDetails component', () => {
  const mockQuestion = {
    _id: '1',
    question: 'Sample Question',
    options: ['Option A', 'Option B'],
    answers: ['Answer A']
  };

  beforeEach(() => {
    useQuestionContext.mockReturnValue({ dispatch: jest.fn() });
  });

  test('renders question details correctly', () => {
    render(
      <Router>
        <QuestionDetails question={mockQuestion} classID="classID" />
      </Router>
    );

    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
    expect(screen.getByText('Options:')).toBeInTheDocument();
    expect(screen.getByText('Answer(s):')).toBeInTheDocument();
    expect(screen.getByText('delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Option A,Option B')).toBeInTheDocument();
    expect(screen.getByText('Answer A')).toBeInTheDocument();
    expect(screen.getByText('Sample Question')).toBeInTheDocument();
  });

  test('calls deleteQuestion function when delete button is clicked', () => {
    const mockCallback = jest.fn()
    render(
        <Router>
        <QuestionDetails question={mockQuestion} classID="classID" onSubmit={mockCallback()} />
        </Router>
    );
    const deleteButton = screen.getByText('delete');
    fireEvent.click(deleteButton)
    expect(mockCallback).toHaveBeenCalled()
  });

  test('toggles edit form visibility when edit button is clicked',() => {
    const mockCallback = jest.fn()
    render(
      <Router>
        <QuestionDetails question={mockQuestion} classID="classID" onSubmit={mockCallback()}/>
        </Router>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(mockCallback).toHaveBeenCalled()
  });
});
