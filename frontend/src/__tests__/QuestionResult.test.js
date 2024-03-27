import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import fetchMock, { post } from 'fetch-mock'

import QuestionResult from "../components/QuestionResult";

import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';



// mock params

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({pathname: "/classroom_id/quiz-results"})
}))

// mock models

const mockClassroom = {
    _id: "classroom_id",
    title: "mclassroom",
    questions: "question_bank_id",
    quizzes: ["quiz_id"],
}

const mockQuestion = {
    _id: "question_id",
    question: "question",
    options: ["option"],
    answers: ["option"],
    questionType: "mockType",
}

const mockQuiz = {
    _id: "quiz_id",
    title: "mquiz",
    questions: [mockQuestion._id]
}

const mockQuestionResults = {
    question: mockQuestion,
    questionResultsArray: [],
}

const mockQuizResult = {
    _id: "mqr",
    quiz: mockQuiz,
    quizResultsArray: [],
}



// mock context
jest.mock('../hooks/useQuestionResultContext', () => ({
    useQuestionResultContext: () => ({question_results: [mockQuestionResults], dispatch: jest.fn()})
}))
jest.mock('../hooks/useQuizzesContext', () => ({
    useQuizzesContext: () => ({quiz: mockQuiz, dispatch: jest.fn()})
}))
jest.mock('../hooks/useQuestionContext', () => ({
    useQuestionContext: () => ({questions: [mockQuestion], dispatch: jest.fn()})
}))



const MockQuestionResult = () => {
    return (
        <QuestionResult quiz_result_id={mockQuizResult._id} quiz_id={mockQuiz._id} />
    )
}

const urlQuizResult = `${process.env.REACT_APP_URL}api/question-results/` + mockQuizResult._id
const urlQuestionResult = `${process.env.REACT_APP_URL}api/questions/` + mockClassroom._id
const urlQuiz = `${process.env.REACT_APP_URL}api/quizzes/` + mockQuiz._id



describe("Appearance tests", () => {
    test("Ensures there is loading text for fetching", () => {
        render(MockQuestionResult())
        const loading_text = screen.getByText('"Still loading all question results..."')
        expect(loading_text).toBeInTheDocument()
    })
})


beforeEach(() => {
    fetchMock.restore()
})
describe("Appearance test after fetches", () => {
    const wait_for_fetch = async (check_this_string) => {
        await waitFor(() => {
            expect(screen.getByText(check_this_string)).toBeInTheDocument()
        })
    }
    beforeEach(async () => {
        fetchMock.mock(urlQuizResult, JSON.stringify(mockQuizResult))
        fetchMock.mock(urlQuestionResult, JSON.stringify([mockQuestionResults]))
        fetchMock.mock(urlQuiz, JSON.stringify(mockQuiz))
        await act(async () => {    
            render(MockQuestionResult())
        })
    })
    
    test("Check results text", async () => {
        render(MockQuestionResult())
        await waitFor(() => {
            expect(screen.getAllByText("Results for " + mockQuiz.title)[0]).toBeInTheDocument()
        })
    })
    test("Check answers label text", async () => {
        render(MockQuestionResult())
        await waitFor(() => {
            expect(screen.getAllByText("Correct answers:")[0]).toBeInTheDocument()
            screen.debug()
        })
    })
    test("Check answers text", async () => {
        render(MockQuestionResult())
        await waitFor(() => {
            expect(screen.getAllByText("question")[0]).toBeInTheDocument()
            expect(screen.getAllByText("option")[0]).toBeInTheDocument()
        })
    })
    
})