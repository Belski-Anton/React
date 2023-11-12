import { createContext, useEffect } from 'react'
import Header from '../../components/header/Header'
import Search from '../../components/search/Search'
import Main from '../../components/main/Main'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Person } from '../../components/main/Main'

interface IInitState {
    searchValue: string
    items: Person[]
    isLoaded: boolean
    totalPage: number
}

export const initialState: IInitState = {
    searchValue: localStorage.getItem('inputValue') ?? '',
    items: [],
    isLoaded: false,
    totalPage: 0,
}

export interface IContext {
    state: IInitState
    setState: React.Dispatch<React.SetStateAction<IInitState>>
}

export const AppContext = createContext<IContext>({
    state: initialState,
    setState: () => {},
})

const MainPage = () => {
    const [state, setState] = useState(initialState)
    const contextValue = { state, setState }
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const currentParams = new URLSearchParams(window.location.search)
    const currentPage = Number(searchParams.get('page')) || 1
    const resultPerPage = Number(searchParams.get('resultPerPage')) || 12

    const getDataForServer = (current: number = currentPage) => {
        const url = state.searchValue
            ? `forename=${state.searchValue}&page=${current}&resultPerPage=${resultPerPage}`
            : `page=${current}&resultPerPage=${resultPerPage}`
        setState({ ...state, isLoaded: true })
        fetch(`https://ws-public.interpol.int/notices/v1/red?${url}`)
            .then((res) => res.json())
            .then((result) => {
                setState({
                    ...state,
                    isLoaded: false,
                    items: result._embedded.notices,
                    totalPage: Math.ceil(
                        result.total > 90 ? 10 : result.count / resultPerPage
                    ),
                })
            })
    }

    useEffect(() => {
        currentParams.set('page', String(1))
        setSearchParams(currentParams.toString())
        getDataForServer(1)
    }, [state.searchValue, resultPerPage])

    useEffect(() => {
        if (currentPage) {
            getDataForServer()
        }
    }, [currentPage])

    return (
        <AppContext.Provider value={contextValue}>
            <div>
                <Header />
                {!id && <Search />}
                <Main />
            </div>
        </AppContext.Provider>
    )
}

export default MainPage
