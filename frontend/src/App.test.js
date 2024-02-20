/*import {render, screen} from '@testing-library/react';
import App from './App';
import ClassroomForm from "./components/forms/ClassroomForm";
import {ClassroomContextProvider} from "./context/ClassroomContext";
import React from "react";

const MockApp = () => {
    return (<ClassroomContextProvider>
        <App/>
    </ClassroomContextProvider>)
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
})*/