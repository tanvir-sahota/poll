import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import fetchMock from 'fetch-mock'

import ShowSelectQuestion from "../components/ShowSelectQuestion";

// import QuizForm from "../components/QuizForm";

import userEvent from "@testing-library/user-event";
import {useState} from "react";
import { act } from 'react-dom/test-utils';


// mock models

const mockClassroom = {
    _id: "classroom_id",
    title: "mclassroom",
    questions: "question_bank_id",
    quizzes: ["quiz_id"],
}

const mockQuiz = {
    _id: "quiz_id",
    title: "mquiz",
}

const mockQuestionBank = {
    _id: "question_bank_id",
    questionArray: ["question_id"],
}

const mockQuestion = {
    _id: "question_id",
    question: "question",
    answers: [""],
    questionType: "mockType",
}



// mock select_question forms

const MockSQForm_with_questions = () => {
    return (
        <ShowSelectQuestion classroom_id={mockClassroom._id} quiz_id={mockQuiz._id} />
    )
}





beforeEach(() => {
    fetchMock.restore()
})

// tests for select_question form with questions
    
describe("Appearance test after questions are fetched (questions and classroom provided)", () => {
    const url = "http://localhost:4000/api/questions/" + mockClassroom._id
    const select_questions_toggle = "Select Questions Below"

    const wait_for_fetch_questions = async (check_this_string) => {
        await waitFor(() => {
            expect(screen.getByText(check_this_string)).toBeInTheDocument()
        })
    }

    test("Ensures toggle button shows for selecting questions", async () => {              

        
        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {    
            render(MockSQForm_with_questions())
        })
        await wait_for_fetch_questions(select_questions_toggle)        
    })
    test("Ensures submit button shows for selecting questions", async () => {
        const submit_button = "Select Questions"
        const user = userEvent.setup()
                

        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {
            render(MockSQForm_with_questions())
        })
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(submit_button)        
    })
})
    
// test("Ensures there is a tag saying no questions available", async () => {
//     render(MockSQForm_with_questions())

//     await wait_for_fetch_questions()
//     const available = screen.getByText(/No questions available/)
//     expect(available).toBeInTheDocument()
// })
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







        // const MockSQForm_no_questions = () => {
        //     return (
        //         <ShowSelectQuestion/>
        //     )
        // }






























        
// MockSQForm_no_classroom = () => {
//     return (
//         <ShowSelectQuestion/>
//         )
// }
// test("Ensures correct text is shown when no classroom_id is given", () => {
//     render(MockSQForm_no_classroom())
//     const text_no_classroom_linked = screen.getByText("No classroom linked to this quiz.")
//     expect(text_no_classroom_linked).toBeInTheDocument()
// })




            // works
            /*


describe("Loading text test (questions and classroom provided)", () => {
    test("Ensures there is loading text for question fetching", () => {
        render(MockSQForm_with_questions())

        const loading_text = screen.getByText("Loading questions...")
        expect(loading_text).toBeInTheDocument()
    })
})

*/

