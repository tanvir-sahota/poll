import {BrowserRouter, Routes, Route} from 'react-router-dom'

import QuizDashboard from './pages/QuizDashboard'
import Quiz from "./pages/Quiz";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="pages">
                    <Routes>
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
