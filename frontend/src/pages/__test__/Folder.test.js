import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import fetchMock from 'fetch-mock'
import Folder from '../Folder';


// mock models

const mockQuiz = {
    _id: "quiz_id",
    title: "mock_quiz",
}

const mockClassroom = {
    _id: "classroom_id",
    title: "mclassroom",
    questions: "question_bank_id",
    quizzes: ["quiz_id"],
}

const mockFolder = {
    _id: "folder_id",
    title: "mock_folder",
    quizzes: [mockQuiz._id],
    classroom: [mockClassroom._id],
}


const urlFolders = `${process.env.REACT_APP_URL}api/folders/` + mockFolder._id
const urlQuizzes = `/api/folders/${mockFolder._id}/quizzes`


// mock context

jest.mock('../../hooks/useQuizzesContext', () => ({
    useQuizzesContext: () => ({quizzes: [mockQuiz], dispatch: jest.fn()})
}))
jest.mock('../../hooks/useFoldersContext', () => ({
    useFoldersContext: () => ({folder: mockFolder, dispatch: jest.fn()})
}))
jest.mock('react-router-dom', () => ({
    useParams: () => ({folder_id: mockFolder._id, classroom_id: mockClassroom._id})
}))



// mock components
const MockFolder = () => {
    return <Folder/>
}

jest.mock('../../components/quiz/QuizDetails', () => () => <div><h3>{mockQuiz.title}</h3></div>)
jest.mock('../../components/buttons/BackButton', () => () => <div><h3>Back button</h3></div>)




describe("rendering folder components", () => {
    test('checks if folder renders itself', async () => {
        const folder = render(MockFolder()).container.firstChild
        expect(folder).toHaveClass('folder')
    })
})

describe("fetch tests", () => {
    beforeEach(() => {
        fetchMock.restore()
    })

    test('checks if fetch folder is sent correctly', () => {
        fetchMock.mock(urlFolders, JSON.stringify(mockFolder))
        render(MockFolder())
        expect(fetchMock.done()).toEqual(true)
    })
    test('checks if fetch quizzes is sent correctly as well', () => {
        fetchMock.mock(urlFolders, JSON.stringify(mockFolder))
        fetchMock.mock(urlQuizzes, JSON.stringify([mockQuiz]))
        render(MockFolder())
        expect(fetchMock.done()).toEqual(true)
    })
})

describe("Appearance tests", () => {
    test("ensures back button is rendered", () => {
        render(MockFolder())
        const backButtonText = screen.getByText("Back button")
        expect(backButtonText).toBeInTheDocument()
    })
    test("ensures folder and quiz are rendered", () => {
        render(MockFolder())
        const folderText = screen.getByText("mock_folder")
        const quizText = screen.getByText("mock_quiz")
        expect(folderText).toBeInTheDocument()
        expect(quizText).toBeInTheDocument()
    })
})
