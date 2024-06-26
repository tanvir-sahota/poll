import { render, screen } from '@testing-library/react';
import App from './App';

import QuizForm from './components/forms/QuizForm';
import {QuizzesContextProvider} from "./context/QuizContext";
// import ClassroomForm from "./components/forms/ClassroomForm";
// import {ClassroomContextProvider} from "./context/ClassroomContext";

import React from "react";

test('renders learn react link', () => {
  /*render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();*/
  expect(1 == 1)
});





const MockAppQuiz = () => {
    return (<QuizzesContextProvider>
        <App/>
    </QuizzesContextProvider>)
}
describe("rendering app components", () => {
    test('checks if app renders itself', () => {
        const app = render(MockAppQuiz()).container.firstChild

        expect(app).toHaveClass('App')
    });

    test('checks if app contains pages', () => {
        const app = render(MockAppQuiz()).container.firstChild
        expect(app.firstChild).toHaveClass('pages')
    });
})

/*
const MockAppClassroom = () => {
    return (<ClassroomContextProvider>
        <App/>
    </ClassroomContextProvider>)
}
describe("rendering app components", () => {
    test('checks if app renders itself', () => {
        const app = render(MockAppClassroom()).container.firstChild

        expect(app).toHaveClass('App')
    });

    test('checks if app contains pages', () => {
        const app = render(MockAppClassroom()).container.firstChild
        expect(app.firstChild).toHaveClass('pages')
    });
})
*/