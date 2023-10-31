import { useState, useEffect } from 'react'
import './Search.css'
import search from '../../assets/img/search.svg'

interface PropsSearch {
    onChange: (val: string) => void
}

const Search = ({ onChange }: PropsSearch) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const savedValue = localStorage.getItem('inputValue')
        if (savedValue) {
            setInputValue(savedValue)
            onChange(savedValue)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleImgClick = () => {
        localStorage.setItem('inputValue', inputValue)
        onChange(inputValue)
    }

    return (
        <div className="wrapperSearch">
            <input
                className="searchInput"
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleChange}
            />
            <img
                className="searchImg"
                src={search}
                alt="search"
                onClick={handleImgClick}
            />
        </div>
    )
}

export default Search
