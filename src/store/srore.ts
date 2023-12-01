import { configureStore } from '@reduxjs/toolkit'
import formSlice from './formSlice'
import countrySlice from './countriesSlice'

export const store = configureStore({
    reducer: {
        user: formSlice,
        country: countrySlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
