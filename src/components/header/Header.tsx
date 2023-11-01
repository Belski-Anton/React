import './Header.css'
import title from '../../assets/img/logonterpol.png'

const Header = () => {
    return (
        <header>
            <h1>
                <img className="imgTitle" src={title} alt="name" />
            </h1>
            <h2 className="text">Wanted</h2>
        </header>
    )
}

export default Header
