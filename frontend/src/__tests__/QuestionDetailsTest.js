import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionDetails from "../components/QuestionDetails"
import { QuestionContextProvider } from "../context/QuestionContext"
import QuestionForm from '../components/QuestionForm'
import { useNavigate } from 'react-router-dom'


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (jest.fn()),
}))
test('renders QuestionDetails correctly and functionality works correctly', () => {

    render(
        <QuestionContextProvider>
                <QuestionDetails question={{"question": "What is 5+5",
                                            "options": ["2", "6", "10", "11"],
                                            "answers": ["Paris"]}}/>
        </QuestionContextProvider>
    )
    
    // Testing elements in form
    expect(screen.getByText('Options:')).toBeInTheDocument()
    expect(screen.getByText('Answer(s):')).toBeInTheDocument()
    expect(screen.getByText('delete', {selector: 'span'})).toBeInTheDocument() 

})