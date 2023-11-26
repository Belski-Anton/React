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