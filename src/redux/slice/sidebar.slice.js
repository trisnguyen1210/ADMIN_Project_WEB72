import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: true
}

export const sideBarSlice = createSlice({
    name: "sideBar",
    initialState,
    reducers: {
        login
    }
})