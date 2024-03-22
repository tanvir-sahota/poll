import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizDetails from '../components/QuizDetails';
import { useQuizzesContext } from '../hooks/useQuizzesContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuizContextProvider } from "../context/QuizContext"

jest.mock('../hooks/useQuizzesContext', () => ({
  useQuizzesContext: jest.fn()
}));

describe('QuizDetails component', () => {
  const mockQuiz = {
    _id:'1',
    title: 'Sample Quiz',
    description: 'This is a sample quiz for testing purposes.',
    num_questions: 5, 
    classroom: 'Classroom 101',
    folder: null,
    questions:null,
  };

  beforeEach(() => {
    useQuizzesContext.mockReturnValue({ dispatch: jest.fn() });
  });

  test('renders quiz details correctly', () => {
    render(
      <Router>
        <QuizDetails quiz={mockQuiz} classID="Classroom 101" />
      </Router>
    );

    expect(screen.getByText(mockQuiz.title)).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText('delete')).toBeInTheDocument();
    expect(screen.getByText('This is a sample quiz for testing purposes.')).toBeInTheDocument();
  });

  test('calls deleteQuiz function when delete button is clicked', () => {
    const mockCallback = jest.fn()
    render(
        <Router>
        <QuizDetails quiz={mockQuiz} classID="Classroom 101" onSubmit={mockCallback()} />
        </Router>
    );
    const deleteButton = screen.getByText('delete');
    fireEvent.click(deleteButton)
    expect(mockCallback).toHaveBeenCalled()
  });
});
