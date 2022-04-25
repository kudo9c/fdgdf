import { publicRequest, userRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure, editInfoStart, editInfoSuccess, editInfoFailure } from "./userRedux"
import {createCartStart, createCartSuccess, createCartFailure,getCartStart,getCartSuccess,getCartFailure,updateCartStart,updateCartSuccess,updateCartFailure, orderStart, orderSuccess, orderFailure, resetCart } from "./cartRedux"
import { createFavorStart,createFavorSuccess, createFavorFailure,getFavorStart,getFavorSuccess,getFavorFailure,updateFavorStart,updateFavorSuccess,updateFavorFailure} from "./favorRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
        getCart(dispatch,res.data._id,res.data.accessToken)
        getFavor(dispatch,res.data._id,res.data.accessToken)
    }catch(err){
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try{
        const res = await publicRequest.post("/auth/register", user)
        dispatch(registerSuccess(res.data))
        const userCart = {userID: res.data._id, products: [], quantity: 0, total: 0 }
        const userFavor= {userID: res.data._id, products: []}
        createCart(dispatch, userCart)
        createFavor(dispatch, userFavor)
    }catch(err){
        dispatch(registerFailure())
    }
}

export const editInfo = async (id, dispatch, user) => {
    dispatch(editInfoStart())
    try{
        const res = await userRequest.put(`/users/${id}`,user)
        dispatch(editInfoSuccess({id, user}))
    }catch(err){
        dispatch(editInfoFailure())
    }
}

export const createFavor = async (dispatch, user) => {
    dispatch(createFavorStart())
    try{
        const res = await publicRequest.post("/favors/", user)
        dispatch(createFavorSuccess(res.data))
    }catch(err){
        dispatch(createFavorFailure())
    }
}

export const getFavor = async (dispatch,id,token) => {
    dispatch(getFavorStart())
    try{
        const request = axios.create({
            baseURL: "http://localhost:5000/api/",
            headers: {token:`Bearer ${token}`}
        })
        const res = await request.get(`/favors/find/${id}`)
        dispatch(getFavorSuccess(res.data))
    }catch(err){
        dispatch(getFavorFailure())
    }
}

export const updateFavor = async (dispatch,id,data) => {
    dispatch(updateFavorStart())
    try{
        await userRequest.put(`/favors/${id}`,data)
        dispatch(updateFavorSuccess())
    }catch(err){
        dispatch(updateFavorFailure())
    }
}

export const createCart = async (dispatch, user) => {
    dispatch(createCartStart())
    try{
        const res = await publicRequest.post("/carts/", user)
        dispatch(createCartSuccess(res.data))
    }catch(err){
        dispatch(createCartFailure())
    }
}

export const getCart = async (dispatch,id,token) => {
    dispatch(getCartStart())
    try{
        const request = axios.create({
            baseURL: "http://localhost:5000/api/",
            headers: {token:`Bearer ${token}`}
        })
        const res = await request.get(`/carts/find/${id}`)
        dispatch(getCartSuccess(res.data))
    }catch(err){
        dispatch(getCartFailure())
    }
}

export const updateCart = async (dispatch,id,data) => {
    dispatch(updateCartStart())
    try{
        const res = await userRequest.put(`/carts/${id}`,data)
        dispatch(updateCartSuccess())
    }catch(err){
        dispatch(updateCartFailure())
    }
}

export const addOrder = async (dispatch, order) => {
    dispatch(orderStart())
    try{
        const res = await userRequest.post("/orders", order)
        dispatch(orderSuccess(res.data))
        dispatch(resetCart())
    }catch(err){
        dispatch(orderFailure())
        
    }
}