import { useState, useEffect } from 'react'
import './Main.css'
import Pagination from '../pagination/Pagination'
import noflag from '../../assets/img/noflag.png'
import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom'
import photo from '../../assets/img/photo.webp'
import iso3166 from 'iso-3166-1'
import ReactCountryFlag from 'react-country-flag'

export const renderFlag = (code: string) => {
    return (
        <ReactCountryFlag
            countryCode={code}
            svg
            style={{
                width: '2em',
                height: '2em',
            }}
            title={code}
        />
    )
}
export const getNationalityName = (code: string) => {
    const country = iso3166.whereAlpha2(code)
    return country ? country.country : code
}
interface PropsPerson {
    searchValue: string
}

export interface Person {
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
    const currentParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState<Person[]>([])
    const [totalPage, setTotalPage] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const resultPerPage = Number(searchParams.get('resultPerPage')) || 12

    const getDataForServer = (current: number = currentPage) => {
        const url = searchValue
            ? `forename=${searchValue}&page=${current}&resultPerPage=${resultPerPage}`
            : `page=${current}&resultPerPage=${resultPerPage}`
        setIsLoaded(true)
        fetch(`https://ws-public.interpol.int/notices/v1/red?${url}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(false)
                setItems(result._embedded.notices)
                setTotalPage(
                    Math.ceil(
                        result.total > 90 ? 10 : result.count / resultPerPage
                    )
                )
            })
    }

    useEffect(() => {
        currentParams.set('page', String(1))
        setSearchParams(currentParams.toString())
        getDataForServer(1)
    }, [searchValue, resultPerPage])

    useEffect(() => {
        if (currentPage) {
            getDataForServer()
        }
    }, [currentPage])

    const changePage = (newPage: number) => {
        currentParams.set('page', String(newPage))
        setSearchParams(currentParams.toString())
    }

    const openDetails = (entityId: string) => {
        const formattedEntityId = entityId.replace(/\//g, '-')
        navigate(`detail/${formattedEntityId}/?page=${currentPage}`)
    }

    return isLoaded || !items.length ? (
        <div className="load">
            {isLoaded ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        <div className={id ? 'wrapperContent' : ''}>
            <div
                className="wrapperMain"
                onClick={() =>
                    id ? navigate(`../../?page=${currentPage}`) : undefined
                }
            >
                {items.map((item, idx) => (
                    <div key={`item-${item.entity_id}-${idx}`} className="card">
                        <div>
                            {item._links?.thumbnail ? (
                                <img
                                    className="photo"
                                    alt={item.forename}
                                    src={item._links.thumbnail.href}
                                />
                            ) : (
                                <img
                                    className="photo"
                                    alt={item.forename}
                                    src={photo}
                                />
                            )}
                        </div>
                        <p>{item.forename}</p>
                        <p>Date(s) of Birth Used: {item.date_of_birth}</p>
                        <p>
                            {Array.isArray(item.nationalities) &&
                            item.nationalities.length > 0 ? (
                                <span
                                    key={item.nationalities[0]}
                                    className="nationality"
                                >
                                    {renderFlag(item.nationalities[0])}
                                    <span>
                                        {getNationalityName(
                                            item.nationalities[0]
                                        )}
                                    </span>
                                </span>
                            ) : (
                                <span className="wrapperNoFlag">
                                    Unknown nationality
                                    <img
                                        className="noFlag"
                                        src={noflag}
                                        alt="flag"
                                    />
                                </span>
                            )}
                        </p>
                        <span
                            className="viewMore"
                            onClick={() => openDetails(item.entity_id)}
                        >
                            view more
                        </span>
                    </div>
                ))}
            </div>
            {!id && (
                <Pagination
                    totalPage={totalPage}
                    currentPage={currentPage}
                    changePage={changePage}
                />
            )}
            <Outlet />
        </div>
    )
}

export default Main
