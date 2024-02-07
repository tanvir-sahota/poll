import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupForm from './components/SignupForm'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<SignupForm />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;