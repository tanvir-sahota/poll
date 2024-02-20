import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionDetails from "../components/QuestionDetails"
import { QuestionContextProvider } from "../context/QuestionContext"
import QuestionForm from '../components/QuestionForm'

test('renders QuestionDetails correctly and functionality works correctly', () => {
    render(
        <QuestionContextProvider>
                <QuestionDetails />
        </QuestionContextProvider>
    )
    
    // Testing elements in form
    expect(screen.getByText('Options:')).toBeInTheDocument()
    expect(screen.getByText('Answer(s):')).toBeInTheDocument()
    expect(screen.getByText('delete', {selector: 'span'})).toBeInTheDocument() 

})