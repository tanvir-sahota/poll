import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QuizzesContextProvider } from "./context/QuizContext";
import { QuestionContextProvider } from './context/QuestionContext';
import { ClassroomContextProvider } from './context/ClassroomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClassroomContextProvider>
      <QuizzesContextProvider>
        <QuestionContextProvider>
          <App/>
        </QuestionContextProvider>
      </QuizzesContextProvider>
    </ClassroomContextProvider>
  </React.StrictMode>

);
