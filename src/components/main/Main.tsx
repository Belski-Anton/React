import './Main.css'
import Card from '../card/Card'
import { useContext } from 'react'
import Pagination from '../pagination/Pagination'
import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom'
import iso3166 from 'iso-3166-1'
import ReactCountryFlag from 'react-country-flag'
import { AppContext } from '../../pages/main/MainPage'

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

const Main = () => {
    const {
        state: { isLoaded, items, totalPage },
    } = useContext(AppContext)
    const currentParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
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
                    <Card
                        key={`item-${item.entity_id}-${idx}`}
                        item={item}
                        openDetails={openDetails}
                    />
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
