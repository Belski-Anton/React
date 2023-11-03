import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Detail.css'
import { Person, getNationalityName, renderFlag } from '../main/Main'
import photo from '../../assets/img/photo.webp'
import moment from 'moment'
interface DataDetail extends Person {
    arrest_warrants: [{ charge: string }]
    weight: number
    height: number
    sex_id: string
}
const Detail = () => {
    const [data, setData] = useState<DataDetail | null>(null)
    const { id } = useParams()
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
    return isLoaded && !data ? (
        <div className="load">
            {isLoaded ? 'Loading...' : 'Nothing was found for your request'}
        </div>
    ) : (
        !!data && (
            <div className="wrapperDetails">
                <div>
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
                <div>Name:{data.forename}</div>
                <div>
                    Age:{' '}
                    {moment(data.date_of_birth, 'YYYY/MM/DD').fromNow(true)}
                </div>
                <div>Height:{data.height}</div>
                <div>Weigt:{data.weight}</div>
                <div>
                    Sex:{' '}
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
                                  {renderFlag(code)}
                                  <span>{getNationalityName(code)}</span>
                              </span>
                          ))
                        : 'No nationalities available'}
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
