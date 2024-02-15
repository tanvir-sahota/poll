import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import QuestionBankPage from './pages/QuestionBankPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/question-bank"  //this will have to take a parameter of 
              element = {<QuestionBankPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
