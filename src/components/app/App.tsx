import MainPage from '../../page/MainPage'
import ButtonWithError from '../button/ButtonWithError'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Detail from '../detail/Detail'
import Footer from '../footer/Footer'

function App() {
    return (
        <>
            <ButtonWithError />
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route path="detail/:id" element={<Detail />} />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}
export default App
