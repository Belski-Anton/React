import { useState } from 'react'
import './Search.css'
import search from '../../assets/img/search.svg'
import Dropdown from '../dropdown/Dropdown'
import { useAppDispatch, useAppSelector } from '../../store'
import { changeValue } from '../../store/searchSlice'

const Search = () => {
    const dispatch = useAppDispatch()
    const { searchValue } = useAppSelector((state) => state.search)
    const [inputValue, setInputValue] = useState(searchValue)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleImgClick = () => dispatch(changeValue(inputValue))

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
