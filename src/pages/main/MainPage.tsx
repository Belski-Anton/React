import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Main from '../../components/main/Main'
import { useParams } from 'react-router-dom'

const MainPage = () => {
    const { id } = useParams()

    return (
        <div>
            <Header />
            {!id && <Search />}
            <Main />
        </div>
    )
}

export default MainPage
