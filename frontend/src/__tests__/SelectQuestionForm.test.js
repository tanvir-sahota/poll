import {render, screen, waitFor, fireEvent} from '@testing-library/react';

import SelectQuestionForm from "../components/SelectQuestionForm";

// import ClassroomForm from "../components/forms/ClassroomForm";
// import QuizForm from "../components/QuizForm";
// import  from "../components/Q";
// import SelectQuestionForm from "../components/SelectQuestionForm";

// import {QuizzesContextProvider} from "../context/QuizContext";
// import {useQuizzesContext} from "../hooks/useQuizzesContext";
// import QuizDashboard from "../pages/QuizDashboard";

import userEvent from "@testing-library/user-event";
import {useState} from "react";

// const MockClassroom = () => {
//     return (
//         <ClassroomForm/>
//     )
// }
// const MockQuestions = () => {
//     return (
//         <SelectQuestionForm/>
//     )
// }


// const MockQuiz_with_questions = () => {
//     return (
//         <SelectQuestionForm/>
//     )
// }
// const MockSQForm_with_questions = () => {
//     return (
//         <SelectQuestionForm/>
//     )
// }


// const MockQuiz_no_questions = () => {
//     return (
//         <SelectQuestionForm/>
//     )
// }
const MockSQForm_no_questions = () => {
    return (
        <SelectQuestionForm/>
    )
}


test("Ensures there is loading text for question fetching", () => {
    render(MockSQForm_no_questions())

    const loading_text = screen.getByText("Loading questions...")
    expect(loading_text).toBeInTheDocument()
})


// describe("Fetched question tests (empty questionBank)", () => {
    // test("Ensures toggle button shows for selecting questions", async () => {
    //     render(MockSQForm_no_questions).container.firstChild

    //     await wait_for_fetch_questions()
    // })
    // test("Ensures submit button shows for selecting questions", async () => {
    //     render(MockSQForm_no_questions).container.firstChild

    //     await wait_for_fetch_questions()
    //     const submitButton = screen.getByText(/Select Questions/)
    //     expect(submitButton).toBeInTheDocument()
    // })
    // test("Ensures there is a tag saying no questions available", async () => {
    //     render(MockSQForm_no_questions).container.firstChild

    //     await wait_for_fetch_questions()
    //     const available = screen.getByText(/No questions available/)
    //     expect(available).toBeInTheDocument()
    // })

    // const wait_for_fetch_questions = async () => {
    //     await waitFor(() => {
    //         expect(screen.getByText("No questions available")).toBeInTheDocument()
    //     })
    // }

//     test("Ensures there is a input for quiz title", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const titleInput = screen.getByPlaceholderText(/Input the new title/)
//         expect(titleInput).toBeInTheDocument()
//     })

//     test("Ensures we can type in the input for quiz title", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const titleInput = screen.getByPlaceholderText(/Input the new title/)
//         fireEvent.change(titleInput, {target: {value: "test title"}})
//         expect(titleInput.value).toBe("test title")
//     })
// })

// describe("quiz description tests", () => {
//     test("Ensures there is a label for quiz description", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const descriptionHeader = screen.getByText(/Description/)
//         expect(descriptionHeader).toBeInTheDocument()
//     })

//     test("Ensures there is a input for quiz description", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const descriptionInput = screen.getByPlaceholderText(/Input the new description/)
//         expect(descriptionInput).toBeInTheDocument()
//     })

//     test("Ensures quiz description input can be modified", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const descriptionInput = screen.getByPlaceholderText(/Input the new description/)
//         fireEvent.change(descriptionInput, {target: {value: "test description"}})
//         expect(descriptionInput.value).toBe("test description")
//     })
// })

// describe("quiz submission tests", () => {
//     test("Checks whether there is a button to submit the new quiz", () => {
//         const quizForm = render(MockQuizForm()).container.firstChild
//         const submitButton = screen.getByRole("button", {name: /Add Quiz/})
//         expect(submitButton).toBeInTheDocument()
//     })

//     test("tests whether a callback is fired when the form is submitted",  () => {
//         const mockCallback = jest.fn()
//         const quizFormMock = render(<QuizzesContextProvider>
//             <QuizForm onSubmit={mockCallback()}/>
//         </QuizzesContextProvider>)

//         const quizForm = quizFormMock.container.firstChild
//         fireEvent.submit(quizForm)
//         expect(mockCallback).toHaveBeenCalled()
//     })

//     test("tests whether a callback is fired when the submission button is pressed",  () => {
//         const mockCallback = jest.fn()
//         const quizFormMock = render(<QuizzesContextProvider>
//             <QuizForm onSubmit={mockCallback()}/>
//         </QuizzesContextProvider>)

//         fireEvent.click(screen.getByRole("button", {name: /Add Quiz/}))
//         expect(mockCallback).toHaveBeenCalled()
//     })

// })




