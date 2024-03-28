import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QuizDashboard from './pages/QuizDashboard'
import FolderDashboard from './pages/FolderDashboard'
import Quiz from "./pages/Quiz"
import Dashboard from './pages/Dashboard'
import Classroom from './pages/Classroom'
import Folder from './pages/Folder'
import QuestionBankPage from './pages/QuestionBankPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignupForm from './components/forms/SignupForm'
import LoginForm from './components/forms/LoginForm'
import HostedClassroom from "./pages/HostedClassroom"
import ConnectionPage from './pages/ConnectionPage'
import Home from "./pages/Home"
import UserPage from './pages/UserPage'
import QuizResult from "./pages/QuizResult"
import io from "socket.io-client"

const socket = io.connect(`${process.env.REACT_APP_URL}`)

function App() {

  return (
    <div id="appjs" className="container-fluid p-3">
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
              path="/:classID/quiz-results"
              element = {<QuizResult/>}
            />
            <Route
                path="/api/quizzes/"
                element={<QuizDashboard/>}
            />
            <Route
                path="/api/folders/"
                element={<FolderDashboard/>}
            />
            <Route
                path="/api/folders/:folder_id/:classroom_id?"
                element={<Folder/>}
            />
            <Route
                path="/api/folders/:folder_id/quizzes"
                element={<Folder/>}
            />
            <Route
                path="/api/quizzes/:quiz_id/:classroom_id?"
                element={<Quiz/>}
            />
            <Route 
              path = "/:lecturer/admin"
              element ={<HostedClassroom socket={socket}/>}
            />
            <Route 
              path="/"
              element ={<Home/>}
            />
            <Route
              path="/:lecturer"
              element={<ConnectionPage socket={socket}/>}
            />
            <Route 
              path="/:lecturer/waiting"
              element={<UserPage socket={socket}/>}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;