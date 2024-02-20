import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import QuestionBankPage from './pages/QuestionBankPage';
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/dashboard" 
              element={<Dashboard />} 
            />
            <Route 
              path="/:classID/question-bank"  //this will have to take a parameter of 
              element = {<QuestionBankPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
