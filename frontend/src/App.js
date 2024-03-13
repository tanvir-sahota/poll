import {BrowserRouter, Routes, Route} from 'react-router-dom'
import QuizDashboard from './pages/QuizDashboard'
import Quiz from "./pages/Quiz"
import Dashboard from './pages/Dashboard'
import Classroom from './pages/Classroom'
import QuestionBankPage from './pages/QuestionBankPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import HostedClassroom from "./pages/HostedClassroom"
import ConnectionPage from './pages/ConnectionPage'
import Home from "./pages/Home"
import UserPage from './pages/UserPage'
import WaitingPage from './pages/WaitingPage'

import io from "socket.io-client"

const socket = io.connect(`${process.env.REACT_APP_URL}habram`)

function App() {

  socket.on("connect", () => {
    console.log(socket.id)
  })

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