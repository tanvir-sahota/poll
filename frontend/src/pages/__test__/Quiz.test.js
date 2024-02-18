import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Quiz from "../Quiz";
import QuizForm from "../../components/QuizForm";
import {QuizzesContextProvider} from "../../context/QuizContext";
import {wait} from "@testing-library/user-event/dist/utils";

const MockQuiz = () => {
    return (<QuizzesContextProvider>
        <Quiz/>
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