import React from 'react'
import './Header.css'
import arrow from '../../assets/icon/arrow-down.png'
import title from '../../assets/img/title-star-wars.png'
class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>
                    <img className="imgTitle" src={title} alt="name" />
                </h1>
                <img src={arrow} alt="arrow" className="arrow" />
                <h2 className="text-flicker">Star Wars Heroes</h2>
                <img src={arrow} alt="arrow" className="arrow" />
            </header>
        )
    }
}

export default Header
