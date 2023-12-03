import { countryArray } from '../shared/countries'
import { createSlice } from '@reduxjs/toolkit'

export interface ICountryState {
    countries: string[]
}

const initialState: ICountryState = {
    countries: countryArray,
}

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload
        },
    },
})

export const { setCountries } = countrySlice.actions

export default countrySlice.reducer
