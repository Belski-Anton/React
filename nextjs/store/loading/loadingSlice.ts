import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ILoad {
  isLoadingData: boolean
  isLoadingDetail: boolean
}

const LoadState: ILoad = {
  isLoadingData: false,
  isLoadingDetail: false
}

export const loadingSlice = createSlice({
  name: 'load',
  initialState: LoadState,
  reducers: {
    changeFlagData: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingData = payload
    },
    changeFlagDetail: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingDetail = payload
    },
  },
})

export const { changeFlagData, changeFlagDetail } =
  loadingSlice.actions
export const { reducer: loadReducer } = loadingSlice