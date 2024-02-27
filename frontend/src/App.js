import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QuizDashboard from './pages/QuizDashboard'
import Quiz from "./pages/Quiz";
import Dashboard from './pages/Dashboard'
import Classroom from './pages/Classroom'
import QuestionBankPage from './pages/QuestionBankPage';
import Navbar from './components/Navbar'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/sign_up" 
              element={<SignupForm />}
            />
            <Route
                path="/log_in"
                element={<LoginForm />}
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
            <Route 
              path="/:classID/classroom" 
              element={<Classroom />} 
            />
            <Route 
              path="/:classID/question-bank"  //this will have to take a parameter of 
              element = {<QuestionBankPage />}
            />
            <Route
                path="/api/quizzes/"
                element={<QuizDashboard/>}
            />
            <Route
                path="/api/quizzes/:id"
                element={<Quiz/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;