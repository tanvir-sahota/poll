import React from "react"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionForm from "../components/QuestionForm"
import { QuestionContextProvider } from "../context/QuestionContext"

test('renders QuestionForm correctly and submits valid input', () => {
    render(
        <QuestionContextProvider>
            <QuestionForm />
        </QuestionContextProvider>
    )
    
    // Testing elements in form
    expect(screen.getByText('Add a new Question')).toBeInTheDocument()
    expect(screen.getByText('Question')).toBeInTheDocument()
    expect(screen.getByText('Options')).toBeInTheDocument()
    expect(screen.getByText('Answers')).toBeInTheDocument()
    expect(screen.getByText('Input as a comma seperated string for multiple answers and options')).toBeInTheDocument()
    expect(screen.getByText('Add Question', {selector: 'button'})).toBeInTheDocument() 

    // Testing submitting form 
    const questionInput = screen.getByText('Question')
    const optionsInput = screen.getByText('Options')
    const answersInput = screen.getByText('Answers')
    userEvent.type(questionInput, 'What is the square root of 25?')
    userEvent.type(optionsInput, '5,4,6,3')
    userEvent.type(answersInput, '5')
    userEvent.click(screen.getByText('Add Question'))

})