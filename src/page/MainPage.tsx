import Header from '../components/header/Header'
import Search from '../components/search/Search'
import Main from '../components/main/Main'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const MainPage = () => {
    const [searchValue, setSearchValue] = useState(
        localStorage.getItem('inputValue') ?? ''
    )
    const { id } = useParams()
    return (
        <div>
            <Header />
            {!id && <Search onChange={setSearchValue} />}
            <Main searchValue={searchValue} />
        </div>
    )
}

export default MainPage
