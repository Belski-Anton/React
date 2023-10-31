import { useState, useEffect } from 'react'
import './Main.css'
import Pagination from '../pagination/Pagination'
import { useSearchParams } from 'react-router-dom'

interface PropsPerson {
    searchValue: string
}

interface Person {
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
}

const Main = ({ searchValue }: PropsPerson) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState<Person[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const getDataForServer = (current: number = currentPage) => {
        const url = searchValue
            ? `?search=${searchValue}&page=${current}`
            : `?page=${current}`
        setIsLoaded(true)
        fetch(`https://swapi.dev/api/people/${url}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(false)
                setItems(result.results)
                setTotalPage(Math.ceil(result.count / 10))
            })
    }
    useEffect(() => {
        setSearchParams({ page: String(1) })
        getDataForServer(1)
    }, [searchValue])

    useEffect(() => {
        if (currentPage !== 1 || !searchValue) {
            getDataForServer()
        }
    }, [currentPage])

    const changePage = (newPage: number) => {
        setSearchParams({ page: String(newPage) })
    }

    return isLoaded || !items.length ? (
        <div className="load">
            {isLoaded ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        <>
            <div className="wrapperMain">
                {items.map((item, index) => (
                    <div key={index} className="card">
                        <p>Name: {item.name}</p>
                        <p>Height: {item.height}</p>
                        <p>Mass: {item.mass}</p>
                        <p>Birth Year: {item.birth_year}</p>
                        <p>Gender: {item.gender}</p>
                    </div>
                ))}
            </div>
            <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                changePage={changePage}
            />
        </>
    )
}

export default Main
