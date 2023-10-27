import React from 'react'
import './Search.css'
import search from '../../assets/img/search.svg'

interface SearchState {
    inputValue: string
}

class Search extends React.Component<object, SearchState> {
    constructor(props: object) {
        super(props)

        this.state = {
            inputValue: '',
        }
    }

    componentDidMount() {
        const savedValue = localStorage.getItem('inputValue')

        if (savedValue) {
            this.setState({ inputValue: savedValue })
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.target.value })
    }

    handleImgClick = () => {
        localStorage.setItem('inputValue', this.state.inputValue)
        window.location.reload()
    }

    render() {
        return (
            <div className="wrapperSearch">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search..."
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                />
                <img
                    className="searchImg "
                    src={search}
                    alt="search"
                    onClick={this.handleImgClick}
                />
            </div>
        )
    }
}

export default Search
