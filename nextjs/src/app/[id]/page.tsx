import { getNationalityName, renderFlag } from '@/components/main'
import './style.css'
import moment from 'moment'
import Image from 'next/image'
import { IDataPerson } from '@/components/card'


type Props = {
  params: {
    id: string
  }
}

interface DataDetail extends IDataPerson {
  arrest_warrants: [{ charge: string }]
  weight: number
  height: number
  sex_id: string
  place_of_birth: string
  name: string
  distinguishing_marks: string
}

async function getData(id: string): Promise<DataDetail> {
  const response = await fetch(`https://ws-public.interpol.int/notices/v1/red/${id}`)

  return response.json()
}


const Detail = async ({ params: { id } }: Props) => {
  const data = await getData(id)
  return (<div className="wrapperDetails">
    <div className="wrapperCross">
      <Image className="cross"
        src='/assets/close.png'
        alt="close"
        width={30}
        height={30}
      />
    </div>
    <div className="wrapperPhoto">
      <Image className="photo"
        width={60}
        height={60}
        alt={data.forename}
        src={data._links?.thumbnail ? `${data._links.thumbnail.href}` : '/assets/photo.webp'}
       />
    </div>
    <div>Forename:{data.forename}</div>
    <div>Name:{data.name}</div>
    <div>Place of Birth: {data.place_of_birth}</div>
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
}

export default Detail
