import {render, screen} from '@testing-library/react';
import App from './App';
import QuizForm from "./components/QuizForm";
import {QuizzesContextProvider} from "./context/QuizContext";
import React from "react";

const MockApp = () => {
    return (<QuizzesContextProvider>
        <App/>
    </QuizzesContextProvider>)
}

describe("rendering app components", () => {
    test('checks if app renders itself', () => {
        const app = render(MockApp()).container.firstChild

        expect(app).toHaveClass('App')
    });

    test('checks if app contains pages', () => {
        const app = render(MockApp()).container.firstChild
        expect(app.firstChild).toHaveClass('pages')
    });
})

