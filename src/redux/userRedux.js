import {createSlice} from "@reduxjs/toolkit"

const userSlide = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
            state.error = false
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false
            state.currentUser=action.payload
        },
        loginFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        registerStart:(state)=>{
            state.error = false
            state.isFetching=true
        },
        registerSuccess:(state, action)=>{
            state.isFetching = false
            console.log(action.payload)
        },
        registerFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        logout:(state)=>{
            state.currentUser = null
        },
        editInfoStart:(state)=>{
            state.isFetching=true
            state.error = false
        },
        editInfoSuccess:(state, action)=>{
            state.isFetching = false
            state.currentUser = action.payload.user
        },
        editInfoFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
    }
})

export const {loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout, editInfoStart, editInfoSuccess, editInfoFailure} = userSlide.actions
export default userSlide.reducer