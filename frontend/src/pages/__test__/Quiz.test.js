import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import QuizDashboard from "../QuizDashboard";
import QuizForm from "../../components/forms/QuizForm";
import {QuizzesContextProvider} from "../../context/QuizContext";

const MockQuiz = () => {
    return (<QuizzesContextProvider>
        <QuizDashboard/>
    </QuizzesContextProvider>)
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

describe("test quiz form", () => {

    test("Ensure quiz page renders quiz form", () => {
        const quiz = render(MockQuiz()).container.firstChild
        const quizForm = screen.getByTitle("quiz form")
        expect(quizForm).toBeInTheDocument()
    })

})
