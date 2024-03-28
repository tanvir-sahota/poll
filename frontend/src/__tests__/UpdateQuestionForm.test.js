import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionDetails from '../components/question/QuestionDetails';
import { useQuestionContext } from '../hooks/useQuestionContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { QuestionContextProvider } from "../context/QuestionContext"
import  UpdateQuestionForm from "../components/forms/UpdateQuestionForm"

jest.mock('../hooks/useQuestionContext', () => ({
    useQuestionContext: jest.fn()
  }));
  
  describe('UpdateQuestionForm component', () => {
    const mockQuestion = {
      _id: '1',
      question: 'Sample Question',
      options: ['Option A', 'Option B'],
      answers: ['Answer A']
    };

    beforeEach(() => {
        useQuestionContext.mockReturnValue({ dispatch: jest.fn() });
      });

      test('renders update question form correctly', () => {
        render(
          <Router>
            <UpdateQuestionForm question={mockQuestion} classID="classID" />
          </Router>
        );
    
        expect(screen.getByText('Update Question')).toBeInTheDocument();
        expect(screen.getByText('Question')).toBeInTheDocument();
        expect(screen.getByText('Options')).toBeInTheDocument();
        expect(screen.getByText('Answers')).toBeInTheDocument();
        expect(screen.getByText("Doesn't require all fields to be inputted")).toBeInTheDocument();
        expect(screen.getByText('Update Question')).toBeInTheDocument();
      });

      test('toggles update form visibility when update question button is clicked',() => {
        const mockCallback = jest.fn()
        render(
          <Router>
            <UpdateQuestionForm question={mockQuestion} classID="classID" onSubmit={mockCallback()}/>
            </Router>
        );
    
        const questionInput = screen.getByText('Question')
        userEvent.type(questionInput, 'new title')
        fireEvent.click(screen.getByRole("button", {name: 'Update Question'}))
        expect(mockCallback).toHaveBeenCalled()
      });
    });
    
    