import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import QuizForm from "../components/QuizForm";
import {QuizzesContextProvider} from "../context/QuizContext";
import QuizDashboard from "../pages/QuizDashboard";
// import {wait} from "@testing-library/user-event/dist/utils";
import userEvent from "@testing-library/user-event";
import {useQuizzesContext} from "../hooks/useQuizzesContext";
import {useState} from "react";

const MockQuizForm = () => {
    return (<QuizzesContextProvider>
        <QuizForm/>
    </QuizzesContextProvider>)
}

test("Ensures there is a header for quiz creation", () => {
    const quizForm = render(MockQuizForm()).container.firstChild
    const createHeader = screen.getByText(/new quiz/)
    expect(createHeader).toBeInTheDocument()
})

describe("quiz title tests", () => {
    test("Ensures there is a label for quiz title", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const titleLabel = screen.getByText(/title/)
        expect(titleLabel).toBeInTheDocument()
    })

    test("Ensures there is a input for quiz title", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        expect(titleInput).toBeInTheDocument()
    })

    test("Ensures we can type in the input for quiz title", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const titleInput = screen.getByPlaceholderText(/Input the new title/)
        fireEvent.change(titleInput, {target: {value: "test title"}})
        expect(titleInput.value).toBe("test title")
    })
})

describe("quiz description tests", () => {
    test("Ensures there is a label for quiz description", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const descriptionHeader = screen.getByText(/Description/)
        expect(descriptionHeader).toBeInTheDocument()
    })

    test("Ensures there is a input for quiz description", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const descriptionInput = screen.getByPlaceholderText(/Input the new description/)
        expect(descriptionInput).toBeInTheDocument()
    })

    test("Ensures quiz description input can be modified", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const descriptionInput = screen.getByPlaceholderText(/Input the new description/)
        fireEvent.change(descriptionInput, {target: {value: "test description"}})
        expect(descriptionInput.value).toBe("test description")
    })
})

describe("quiz submission tests", () => {
    test("Checks whether there is a button to submit the new quiz", () => {
        const quizForm = render(MockQuizForm()).container.firstChild
        const submitButton = screen.getByRole("button", {name: /Add Quiz/})
        expect(submitButton).toBeInTheDocument()
    })

    test("tests whether a callback is fired when the form is submitted",  () => {
        const mockCallback = jest.fn()
        const quizFormMock = render(<QuizzesContextProvider>
            <QuizForm onSubmit={mockCallback()}/>
        </QuizzesContextProvider>)

        const quizForm = quizFormMock.container.firstChild
        fireEvent.submit(quizForm)
        expect(mockCallback).toHaveBeenCalled()
    })

    test("tests whether a callback is fired when the submission button is pressed",  () => {
        const mockCallback = jest.fn()
        const quizFormMock = render(<QuizzesContextProvider>
            <QuizForm onSubmit={mockCallback()}/>
        </QuizzesContextProvider>)

        fireEvent.click(screen.getByRole("button", {name: /Add Quiz/}))
        expect(mockCallback).toHaveBeenCalled()
    })

})




