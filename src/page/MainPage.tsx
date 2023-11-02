import Header from '../components/header/Header'
import Search from '../components/search/Search'
import Main from '../components/main/Main'
import { useState } from 'react'

const MainPage = () => {
    const [searchValue, setSearchValue] = useState(
        localStorage.getItem('inputValue') ?? ''
    )
    return (
        <div>
            <Header />
            <Search onChange={setSearchValue} />
            <Main searchValue={searchValue} />
        </div>
    )
}

export default MainPage