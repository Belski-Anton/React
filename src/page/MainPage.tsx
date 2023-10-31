import Header from '../components/header/Header'
import Search from '../components/search/Search'
import Main from '../components/main/Main'
import ButtonWithError from '../components/button/ButtonWithError'

const MainPage = () => {
    return (
        <div>
            <Header />
            <Search />
            <Main />
            <ButtonWithError />
        </div>
    )
}

export default MainPage
