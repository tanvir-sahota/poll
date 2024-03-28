import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import QuizDashboard from "../QuizDashboard";
import fetchMock from 'fetch-mock'

const urlQuizzes = `${process.env.REACT_APP_URL}api/quizzes`


// mock models

const mockQuiz = {
    _id: "quiz_id",
    title: "mquiz",
}


// mock context

jest.mock('../../hooks/useQuizzesContext', () => ({
    useQuizzesContext: () => ({quizzes: [mockQuiz], dispatch: jest.fn()})
}))


// mock components

jest.mock('../../components/quiz/QuizDetails', () => () => <div><h3>{mockQuiz.title}</h3></div>)
jest.mock('../../components/forms/QuizForm', () => () => <div><form title="quiz form"></form></div>)



const MockQuiz = () => {
    return <QuizDashboard/>
}

describe("rendering quiz components", () => {
    test('checks if quiz renders itself', async () => {
        const quiz = render(MockQuiz()).container.firstChild
        expect(quiz).toHaveClass('quiz')
    })
    test('checks if quiz renders all the various quizzes', async () => {
        const quiz = render(MockQuiz()).container.firstChild
        expect(quiz.childNodes.item(1)).toHaveClass('quizzes')
    })

})

describe("fetch tests", () => {
    beforeEach(() => {
        fetchMock.restore()
    })
    test('checks if fetch is sent correctly', () => {
        fetchMock.mock(urlQuizzes, JSON.stringify([mockQuiz]))
        render(MockQuiz())
        expect(fetchMock.done()).toEqual(true)
    })
})

describe("test quiz form", () => {
    test("Ensure quiz page renders quiz form", () => {
        render(MockQuiz())
        const quizForm = screen.getByTitle("quiz form")
        expect(quizForm).toBeInTheDocument()
    })
})
