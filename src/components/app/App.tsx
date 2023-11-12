import MainPage from '../../pages/main/MainPage'
import ButtonWithError from '../button/ButtonWithError'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Detail from '../detail/Detail'
import Footer from '../footer/Footer'
import NotFound from '../../pages/notFound/NotFound'

function App() {
    return (
        <>
            <ButtonWithError />
            <Routes>
                <Route path="/" element={<MainPage />}>
                    <Route path="detail/:id" element={<Detail />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    )
}
export default App
