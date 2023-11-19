import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISearch {
    searchValue: string
}

const SearchState: ISearch = {
    searchValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState: SearchState,
    reducers: {
        changeValue: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload
        },
    },
})

export const { changeValue } = searchSlice.actions
export const { reducer: searchReducer } = searchSlice
