import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products:[],
    quantity:0,
    isFetching: false,
    error: false,
}

const favorSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        isFetching: false,
        error: false,
    },
    reducers:{
        createFavorStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        createFavorSuccess:(state)=>{
            state.isFetching = false
            state = initialState
        },
        createFavorFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        getFavorStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        getFavorSuccess:(state, action)=>{
            state.isFetching = false
            state.products = action.payload.products
        },
        getFavorFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        addFavorProduct:(state, action)=>{
            state.quantity += 1
            state.products.push(action.payload)
        },
        deleteFavorProduct: (state, action) => {
            state.quantity -= 1
            state.products.splice(state.products.findIndex(item => item.productID === action.payload),1)
        },
        updateFavorStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        updateFavorSuccess:(state)=>{
            state.isFetching = false
        },
        updateFavorFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        resetFavor: (state) => {
            state.products = []
            state.quantity = 0
        }
    }
})

export const {createFavorStart,createFavorSuccess,createFavorFailure,getFavorStart,getFavorSuccess,getFavorFailure,addFavorProduct, deleteFavorProduct, updateFavorStart,updateFavorSuccess,updateFavorFailure, resetFavor} = favorSlice.actions

export default favorSlice.reducer