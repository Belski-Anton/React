import './Header.css'
import title from '../../assets/img/logonterpol.png'

const Header = () => {
    return (
        <header>
            <h1 className="title">
                <img className="imgTitle" src={title} alt="name" />
                <div className="textTitle">
                    View and search public Red Notices for wanted persons
                </div>
            </h1>
        </header>
    )
}

export default Header
