import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import QuestionBank from './pages/QuestionBank';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/question-bank"
              element = {<QuestionBank />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
