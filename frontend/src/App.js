import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Quiz from './pages/Quiz'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Quiz />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
