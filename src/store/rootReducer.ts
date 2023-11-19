import { combineReducers } from '@reduxjs/toolkit'

import { api } from '../api'
import { searchReducer } from './searchSlice'

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>
