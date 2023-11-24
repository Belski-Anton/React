import { combineReducers } from '@reduxjs/toolkit'

import { api } from '../api'
import { loadReducer } from './loading/loadingSlice'
import { dataForApiSliceReducer } from './dataForApi/dataForApiSlice'

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  load: loadReducer,
  dataForApiSlice: dataForApiSliceReducer
})

export type RootState = ReturnType<typeof rootReducer>