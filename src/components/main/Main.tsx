import React from 'react'
import './Main.css'
class Main extends React.Component {
    render() {
        const cards = Array(12).fill(null)
        return (
            <div className="wrapperMain">
                {cards.map((_, index) => (
                    <div key={index} className="card"></div>
                ))}
            </div>
        )
    }
}

export default Main
