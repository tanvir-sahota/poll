import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import fetchMock, { post } from 'fetch-mock'

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
const url = "http://localhost:4000/api/questions/" + mockClassroom._id
const select_questions_toggle = "Select Questions Below"
const user = userEvent.setup()

describe("Appearance test after questions are fetched (questions and classroom provided)", () => {
    const wait_for_fetch_questions = async (check_this_string) => {
        await waitFor(() => {
            expect(screen.getByText(check_this_string)).toBeInTheDocument()
        })
    }

    beforeEach(async () => {
        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {    
            render(MockSQForm_with_questions())
        })
    })

    test("Ensures toggle button shows for selecting questions", async () => {
        await wait_for_fetch_questions(select_questions_toggle)        
    })
    test("Ensures submit button shows for selecting questions", async () => {
        const submit_button = "Select Questions"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(submit_button)        
    })
    test("Ensures checkbox text shows for selecting one question", async () => {
        const question_checkbox = "question"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(question_checkbox)
    })
    test("Ensures checkbox itself shows for selecting one question", async () => {
        const question_checkbox = "question"
        
        await user.click(screen.getByText(select_questions_toggle))
        await wait_for_fetch_questions(question_checkbox)
        await waitFor(() => {
            expect(screen.queryByRole('checkbox')).toBeInTheDocument()
        })
    })
})

describe("Ensure requests are sent properly when patching quizzes", () => {
    const get_quiz_url = "http://localhost:4000/api/quizzes/" + mockQuiz._id
    
    test("Ensures GET and PATCH requests consecutively sent after submit is clicked", async() => {
        fetchMock.mock(url, JSON.stringify([mockQuestion]))
        await act(async () => {    
            render(MockSQForm_with_questions())
        })
        
        fetchMock.get(get_quiz_url, JSON.stringify(mockQuiz))
        fetchMock.patch(get_quiz_url, JSON.stringify(mockQuiz))
        
        await user.click(screen.getByText(select_questions_toggle))
        await user.click(screen.queryByRole('checkbox'))
        await user.click(screen.queryByRole('button'))
    })
})