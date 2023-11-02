import { useState, useEffect } from 'react'
import './Main.css'
import Pagination from '../pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import photo from '../../assets/img/photo.webp'
import iso3166 from 'iso-3166-1'

interface PropsPerson {
    searchValue: string
}

interface Person {
    forename: string
    date_of_birth: string
    entity_id: string
    nationalities: string[]
    _links: {
        thumbnail?: {
            href: string
        }
    }
}

const Main = ({ searchValue }: PropsPerson) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState<Person[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const getDataForServer = (current: number = currentPage) => {
        const url = searchValue
            ? `forename=${searchValue}&page=${current}&resultPerPage=12`
            : `page=${current}&resultPerPage=12`
        setIsLoaded(true)
        fetch(`https://ws-public.interpol.int/notices/v1/red?${url}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(false)
                setItems(result._embedded.notices)
                setTotalPage(
                    Math.ceil(result.total > 90 ? 10 : result.count / 12)
                )
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

    const getNationalityName = (code: string) => {
        const country = iso3166.whereAlpha2(code)
        return country ? country.country : code
    }

    return isLoaded || !items.length ? (
        <div className="load">
            {isLoaded ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        <>
            <div className="wrapperMain">
                {items.map((item) => (
                    <div key={item.entity_id} className="card">
                        <p>
                            {item._links?.thumbnail ? (
                                <img
                                    className="photo"
                                    alt=""
                                    src={item._links.thumbnail.href}
                                />
                            ) : (
                                <img className="photo" alt="" src={photo} />
                            )}
                        </p>
                        <p>{item.forename}</p>
                        <p>Date(s) of Birth Used: {item.date_of_birth}</p>
                        <p>
                            {Array.isArray(item.nationalities)
                                ? item.nationalities
                                      .map(getNationalityName)
                                      .join(', ')
                                : 'No nationalities available'}
                        </p>
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
