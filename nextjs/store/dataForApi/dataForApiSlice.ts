import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IData {
  forename: string,
  page: string, 
  resultPerPage: string
  totalPage: number
}

const DataState: IData = {
  forename: '',
  page: '1',
  resultPerPage: '12',
  totalPage: 0
}

export const dataForApiSlice = createSlice({
  name: 'dataForApiSlice',
  initialState: DataState,
  reducers: {
    changeForename: (state, { payload }: PayloadAction<string>) => {
      state.forename = payload
    },
    changePage: (state, { payload }: PayloadAction<string>) => {
      state.page = payload
    },
    changeResultPerPage: (state, { payload }: PayloadAction<string>) => {
      state.resultPerPage = payload
    },
    changeTotalPage: (state, { payload }: PayloadAction<number>) => {
      state.totalPage = payload
    },
  },
})

export const { changeForename, changePage, changeResultPerPage, changeTotalPage } =
  dataForApiSlice.actions
export const { reducer: dataForApiSliceReducer } = dataForApiSlice