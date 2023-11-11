import { useState, useContext } from 'react'
import './Search.css'
import search from '../../assets/img/search.svg'
import Dropdown from '../dropdown/Dropdown'
import { AppContext } from '../../pages/main/MainPage'

const Search = () => {
    const { state, setState } = useContext(AppContext)
    const [inputValue, setInputValue] = useState(state.searchValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleImgClick = () => {
        localStorage.setItem('inputValue', inputValue)
        setState({ ...state, searchValue: inputValue })
    }

    return (
        <div className="wrapperSelectSearch">
            <Dropdown />

            <div className="wrapperSearch">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search..."
                    value={inputValue}
                    onChange={handleChange}
                    data-testid="search"
                />
                <img
                    className="searchImg"
                    src={search}
                    alt="search"
                    onClick={handleImgClick}
                />
            </div>
        </div>
    )
}

export default Search
