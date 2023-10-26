import React from 'react'
import './Header.css'
import arrow from '../../assets/icon/arrow-down.png'
class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>Star Wars</h1>
                <img src={arrow} alt="arrow" className="arrow" />
                <h2 className="text-flicker">ENTER NAME</h2>
                <img src={arrow} alt="arrow" className="arrow" />
            </header>
        )
    }
}

export default Header
