import './MainPages.css'
import SaveFormTwo from '../../components/saveFormTwo/SaveFormTwo'
import SaveFormOne from '../../components/saveFormOne/SaveFormOne'

const MainPages = () => {
    return (
        <div className="main_page">
            <SaveFormOne />
            <SaveFormTwo />
        </div>
    )
}

export default MainPages
