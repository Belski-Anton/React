import React from 'react'
import Header from '../header/Header'
import Search from '../search/Search'
import Main from '../main/Main'
import ButtonWithError from '../../components/button/ButtonWithError'
import './App.css'

class App extends React.Component {
    render() {
        return (
            <>
                <Header />

                <Search />
                <Main />
                <ButtonWithError />
            </>
        )
    }
}

export default App
