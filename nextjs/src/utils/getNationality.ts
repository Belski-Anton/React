import iso3166 from 'iso-3166-1'

export const getNationalityName = (code: string) => {
  const country = iso3166.whereAlpha2(code)
  return country ? country.country : code
}