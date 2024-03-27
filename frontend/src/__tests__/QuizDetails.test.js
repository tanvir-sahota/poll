import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizDetails from '../components/QuizDetails';


const mockCallback = jest.fn()

// mock navigate

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

// mock context

jest.mock('../hooks/useQuizzesContext', () => ({
    useQuizzesContext: () => ({dispatch: jest.fn()})
}))



// mock models

const mockQuiz = {
  _id:'1',
  title: 'Sample Quiz',
  description: 'This is a sample quiz for testing purposes.',
  num_questions: 5, 
  classroom: 'Classroom 101',
  folder: null,
  questions:null,
};

const mockClassroom = {
    _id: "classroom_id",
    title: "mclassroom",
    questions: "question_bank_id",
    quizzes: ["quiz_id"],
}


const MockQuizDetails = () => {
  return (
      <QuizDetails quiz={mockQuiz} classID="Classroom 101" onSubmit={mockCallback()} />
    )
}




// tests

describe('QuizDetails component', () => {
  beforeEach(() => {
    render(MockQuizDetails())
  })

  test('check mock quiz title', async () => {
    await waitFor(() => {
      expect(screen.getByText(mockQuiz.title)).toBeInTheDocument();
    })
  });
  test('check text description', () => {
    expect(screen.getByText('Description:')).toBeInTheDocument();
  });
  test('check text to Delete', () => {
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
  test('check actual description', () => {
    expect(screen.getByText('This is a sample quiz for testing purposes.')).toBeInTheDocument();
  });
});
