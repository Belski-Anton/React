import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IForm {
    email: string
    password: string
    confirmPassword: string
    name: string
    age: number
    gender: string
    image: string
    country: string
    isAgree?: boolean
}

export interface IFormItems {
    items: IForm[]
}

const initialState: IFormItems = {
    items: [],
}

const formSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        addForm: (state, action: PayloadAction<IForm>) => {
            state.items = [...state.items, action.payload]
        },
    },
})

export default formSlice.reducer
export const formActions = formSlice.actions
