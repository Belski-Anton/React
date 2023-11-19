import './Main.css'
import Card from '../card/Card'
import Pagination from '../pagination/Pagination'
import {
    Outlet,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom'
import iso3166 from 'iso-3166-1'
import ReactCountryFlag from 'react-country-flag'
import { useGetPersonsQuery } from '../../api'
import { useAppSelector } from '../../store'

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

const Main = () => {
    const { searchValue } = useAppSelector((state) => state.search)
    const currentParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const resultPerPage = Number(searchParams.get('resultPerPage')) || 12
    const changePage = (newPage: number) => {
        currentParams.set('page', String(newPage))
        setSearchParams(currentParams.toString())
    }

    const openDetails = (entityId: string) => {
        const formattedEntityId = entityId.replace(/\//g, '-')
        navigate(`detail/${formattedEntityId}/?page=${currentPage}`)
    }
    const { data, isFetching } = useGetPersonsQuery({
        page: currentPage,
        resultPerPage,
        searchValue,
    })

    return isFetching || !data?._embedded.notices.length ? (
        <div className="load">
            {isFetching ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        <div className={id ? 'wrapperContent' : ''}>
            <div
                className="wrapperMain"
                onClick={() =>
                    id ? navigate(`../../?page=${currentPage}`) : undefined
                }
            >
                {data?._embedded.notices.map((item, idx) => (
                    <Card
                        key={`item-${item.entity_id}-${idx}`}
                        item={item}
                        openDetails={openDetails}
                    />
                ))}
            </div>
            {!id && (
                <Pagination
                    totalPage={data.total / resultPerPage}
                    currentPage={currentPage}
                    changePage={changePage}
                />
            )}
            <Outlet />
        </div>
    )
}

export default Main
