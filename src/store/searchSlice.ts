import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearch {
    searchValue: string
    isLoadingData: boolean
    isLoadingDetail: boolean
}

const SearchState: ISearch = {
    searchValue: '',
    isLoadingData: false,
    isLoadingDetail: false,
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: SearchState,
    reducers: {
        changeValue: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload
        },
        changeFlagData: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoadingData = payload
        },
        changeFlagDetail: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoadingDetail = payload
        },
    },
})

export const { changeValue, changeFlagData, changeFlagDetail } =
    searchSlice.actions
export const { reducer: searchReducer } = searchSlice
