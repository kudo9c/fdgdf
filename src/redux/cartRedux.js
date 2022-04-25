import {createSlice} from "@reduxjs/toolkit"

const initialState = {
        products:[],
        quantity:0,
        total:0,   
        isFetching: false,
        error: false, 
}


const cartSlide = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0,
        isFetching: false,
        error: false,
    },
    reducers:{
        createCartStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        createCartSuccess:(state, action)=>{
            state.isFetching = false
            state = initialState
        },
        createCartFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        getCartStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        getCartSuccess:(state, action)=>{
            state.isFetching = false
            state.products = action.payload.products
            state.quantity = action.payload.quantity
            state.total = action.payload.total
        },
        getCartFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        addProduct:(state, action)=>{
            if(state.quantity === 0) {
                state.quantity = 1
                state.products.push(action.payload)
                state.total += action.payload.price * action.payload.quantity;
            } else {
                let check = false;
                state.products.map((item,key)=>{
                    if(item._id===action.payload._id && item.combo === action.payload.combo && item.color === action.payload.color){
                        state.products[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    state.products.push(action.payload)
                    state.quantity += 1
                }
                state.total += action.payload.price * action.payload.quantity;
            }
        },
        deleteProduct: (state, action) => {
            state.quantity -= 1
            state.products.splice(action.payload,1)
        },
        updatePrice: (state, action) => {
            state.total = action.payload
        },
        addQuantity: (state, action) => {
            state.products[action.payload].quantity++
        },
        descQuantity: (state, action) => {
            state.products[action.payload].quantity > 1 && state.products[action.payload].quantity--
        },
        updateCartStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        updateCartSuccess:(state)=>{
            state.isFetching = false
        },
        updateCartFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        orderStart: (state) => {
            state.isFetching=true
            state.error = false
        },
        orderSuccess:(state, action)=>{
            state.isFetching = false
            state = action.payload
        },
        orderFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        resetCart: (state) => {
            state.products = []
            state.total = 0
            state.quantity = 0
        }
    }
})

export const {createCartStart, createCartSuccess, createCartFailure, getCartStart,getCartSuccess,getCartFailure, 
    addProduct,deleteProduct, updatePrice, addQuantity, descQuantity, orderStart, orderSuccess, orderFailure,updateCartStart,
    updateCartSuccess,updateCartFailure, resetCart} = cartSlide.actions
export default cartSlide.reducer
