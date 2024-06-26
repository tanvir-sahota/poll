import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QuizzesContextProvider } from "./context/QuizContext";
import { QuestionContextProvider } from './context/QuestionContext';
import { ClassroomContextProvider } from './context/ClassroomContext';
import { AuthContextProvider } from './context/AuthContext';
import {QuizResultsContextProvider} from "./context/QuizResultContext";
import {QuestionResultsContextProvider} from "./context/QuestionResultContext";
import { FoldersContextProvider } from './context/FolderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <ClassroomContextProvider>
          <FoldersContextProvider>
        <QuizzesContextProvider>
          <QuestionContextProvider>
              <QuizResultsContextProvider>
                  <QuestionResultsContextProvider>
                      <App/>
                  </QuestionResultsContextProvider>
              </QuizResultsContextProvider>
          </QuestionContextProvider>
        </QuizzesContextProvider>
              </FoldersContextProvider>
      </ClassroomContextProvider>
    </AuthContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
