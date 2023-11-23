import './style.css'

import iso3166 from 'iso-3166-1'
import ReactCountryFlag from 'react-country-flag'
import Card, { IDataPerson } from '../card'

interface IResponsePersons {
  total: number
  _embedded: {
    notices: IDataPerson[]
  }
}

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

async function getData(): Promise<IResponsePersons> {
  const response = await fetch('https://ws-public.interpol.int/notices/v1/red/?resultPerPage=12')

  return response.json()
}

const Main = async () => {
  const data = await getData()

  return (
    <div
      className="wrapperMain"
    >
      {data?._embedded.notices.map((item, idx) => (
        <Card
          key={`item-${item.entity_id}-${idx}`}
          item={item}
        />
      ))}
    </div>
  )

}

export default Main