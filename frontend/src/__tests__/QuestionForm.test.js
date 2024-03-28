import React from "react"
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionForm from "../components/QuestionForm"
import { QuestionContextProvider } from "../context/QuestionContext"


const MockQuestionForm = () => {
    return(
        <QuestionContextProvider>
            <QuestionForm/>
        </QuestionContextProvider>
    )
}


describe('question form rendering tests', () => {


    test('form title renders', () => {
         render(MockQuestionForm())
        expect(screen.getByText('Create Question')).toBeInTheDocument()
    })

    test('form subtitle question renders', () => {
         render(MockQuestionForm())
        fireEvent.click(screen.getByText('Create Question'))
        expect(screen.getByText('Question')).toBeInTheDocument()
    })
    test('form subtitle options renders', () => {
         render(MockQuestionForm())
        fireEvent.click(screen.getByText('Create Question'))
        expect(screen.getByText('Options')).toBeInTheDocument()
    })
    test('form subtitle answers renders', () => {
         render(MockQuestionForm())
        fireEvent.click(screen.getByText('Create Question'))
        expect(screen.getByText('Answers')).toBeInTheDocument()
    })
    test('form button submission renders', () => {
         render(MockQuestionForm())
        fireEvent.click(screen.getByText('Create Question'))
        expect(screen.getByText('Add Question', {selector: 'button'})).toBeInTheDocument()
    })



})

describe('form submission tests', () => {
    test('renders QuestionForm correctly and submits valid input', () => {
        const mockCallback = jest.fn()
         render(<QuestionContextProvider>
            <QuestionForm onSubmit={mockCallback()}/>
        </QuestionContextProvider>)

        fireEvent.click(screen.getByText('Create Question'))
        // Testing submitting form
        const questionInput = screen.getByText('Question')
        const optionsInput = screen.getByText('Options')
        const answersInput = screen.getByText('Answers')
        userEvent.type(questionInput, 'What is the square root of 25?')
        userEvent.type(optionsInput, '5,4,6,3')
        userEvent.type(answersInput, '5')
        fireEvent.click(screen.getByRole("button", {name: 'Add Question'}))
        expect(mockCallback).toHaveBeenCalled()
    })

    test('renders QuestionForm correctly and submits valid input for multiple choice questions', () => {
        const mockCallback = jest.fn()
         render(<QuestionContextProvider>
            <QuestionForm onSubmit={mockCallback()}/>
        </QuestionContextProvider>)

        fireEvent.click(screen.getByText('Create Question'))
        // Testing submitting form
        const questionInput = screen.getByText('Question')
        const optionsInput = screen.getByText('Options')
        const answersInput = screen.getByText('Answers')
        userEvent.type(questionInput, 'What is the square root of 25?')
        userEvent.type(optionsInput, '5,4,6,3')
        userEvent.type(answersInput, '5, 4')
        fireEvent.click(screen.getByRole("button", {name: 'Add Question'}))
        expect(mockCallback).toHaveBeenCalled()
    })

})


