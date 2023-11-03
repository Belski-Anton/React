import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Detail.css'
import { Person, getNationalityName, renderFlag } from '../main/Main'
import photo from '../../assets/img/photo.webp'
import moment from 'moment'
import cross from '../../assets/img/close.png'

interface DataDetail extends Person {
    arrest_warrants: [{ charge: string }]
    weight: number
    height: number
    sex_id: string
    place_of_birth: string
    name: string
    distinguishing_marks: string
}
const Detail = () => {
    const [searchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const [data, setData] = useState<DataDetail | null>(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const getDataForServer = () => {
        setIsLoaded(true)
        fetch(`https://ws-public.interpol.int/notices/v1/red/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(false)
                setData(result)
            })
    }
    useEffect(() => {
        getDataForServer()
    }, [])
    const handleCloseDetail = () => {
        navigate(`../../?page=${currentPage}`)
    }
    return isLoaded && !data ? (
        <div className="load">
            {isLoaded ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        !!data && (
            <div className="wrapperDetails">
                <div className="wrapperCross">
                    {' '}
                    <img
                        className="cross"
                        src={cross}
                        alt="close"
                        onClick={handleCloseDetail}
                    />
                </div>
                <div className="wrapperPhoto">
                    {data._links?.thumbnail ? (
                        <img
                            className="photo"
                            alt={data.forename}
                            src={data._links.thumbnail.href}
                        />
                    ) : (
                        <img
                            className="photo"
                            alt={data?.forename}
                            src={photo}
                        />
                    )}
                </div>
                <div>Forename:{data.forename}</div>
                <div>Name:{data.name}</div>
                <div></div>
                <div>Place of Birth:{data.place_of_birth}</div>
                <div>
                    Age:{' '}
                    {moment(data.date_of_birth, 'YYYY/MM/DD').fromNow(true)}
                </div>
                <div>Height:{data.height}</div>
                <div>Weigt:{data.weight}</div>
                <div>
                    Gender:{' '}
                    {data.sex_id === 'M'
                        ? 'Male'
                        : data.sex_id === 'F'
                        ? 'Female'
                        : data.sex_id}
                </div>
                <div className="nationalite">
                    Nationality :{' '}
                    {Array.isArray(data.nationalities) &&
                    data.nationalities.length > 0
                        ? data.nationalities.map((code) => (
                              <span key={code} className="nationality">
                                  <div className="flag">
                                      {' '}
                                      {renderFlag(code)}
                                  </div>
                                  <span>{getNationalityName(code)}</span>
                              </span>
                          ))
                        : 'No nationalities available'}
                </div>
                <div>
                    <h3 className="arrestWarrants">Arrest warrant:</h3>
                </div>
                {!!data.arrest_warrants.length && (
                    <div className="descrCard">
                        {data?.arrest_warrants[0].charge}
                    </div>
                )}
            </div>
        )
    )
}

export default Detail
