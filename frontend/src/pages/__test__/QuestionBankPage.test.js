import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import fetchMock from 'fetch-mock'
import QuestionBank from '../QuestionBankPage';


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


const urlQuestions = `${process.env.REACT_APP_URL}api/questions/` + mockClassroom._id


// mock context

jest.mock('../../hooks/useQuestionContext', () => ({
    useQuestionContext: () => ({quizzes: [mockQuestion], dispatch: jest.fn()})
}))
jest.mock('react-router-dom', () => ({
    useLocation: () => ({pathname: "/classroom_id/question-bank"})
}))


// mock components
const MockQuestionBank = () => {
    return <QuestionBank/>
}

jest.mock('../../components/question/QuestionDetails', () => () => <div><h3>{mockQuestion.question}</h3></div>)
jest.mock('../../components/buttons/BackButton', () => () => <div><h3>Back button</h3></div>)




describe("fetch tests", () => {
    beforeEach(() => {
        fetchMock.restore()
    })

    test('checks if fetch questions is sent correctly', () => {
        fetchMock.mock(urlQuestions, JSON.stringify([mockQuestion]))
        render(MockQuestionBank())
        expect(fetchMock.done()).toEqual(true)
    })
})

describe("Appearance tests", () => {
    test("ensures Question Bank text is rendered", () => {
        render(MockQuestionBank())
        const questionBankText = screen.getByText("Question Bank")
        expect(questionBankText).toBeInTheDocument()
    })
    test("ensures back button is rendered", () => {
        render(MockQuestionBank())
        const backButtonText = screen.getByText("Back button")
        expect(backButtonText).toBeInTheDocument()
    })
})
