import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IForm {
    email: string
    password: string
    confirmPassword: string
    name: string
    age: string
    gender: string
    image: string | null
}

const initialState: IForm = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    image: null,
}
const formSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        addEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        addPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        addConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload
        },
        addName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        addAge: (state, action: PayloadAction<string>) => {
            state.age = action.payload
        },
        addGender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload
        },
        addImage: (state, action: PayloadAction<string | null>) => {
            state.image = action.payload
        },
    },
})

export default formSlice.reducer
export const formActions = formSlice.actions
