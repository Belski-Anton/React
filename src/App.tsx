import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import MainPages from './pages/MainPage/MainPages'
import ControllPage from './pages/ControllPage/ControllPage'
import UncontrollPage from './pages/UncontrollPage/UncontrollPage'
import NotFountPage from './pages/NotFoundPage/NotFoundPage'
function App() {
    return (
        <>
            <header>
                <Link to="/">Home</Link>
                <Link to="/form-1">Form №1</Link>
                <Link to="/form-2">Form №2</Link>
            </header>
            <Routes>
                <Route path="/" element={<MainPages />} />
                <Route path="/form-1" element={<ControllPage />} />
                <Route path="/form-2" element={<UncontrollPage />} />
                <Route path="*" element={<NotFountPage />} />
            </Routes>
        </>
    )
}

export default App
