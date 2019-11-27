import { AUTH_USER_SUCCESSFUL, AUTH_USER_SIGN_IN, AUTH_USER_LOGOUT, TRANSACTION_LIST, ADD_TRANSACTION, CHANGE_CREDIT } from '../actionTypes/actionTypes';
import Axios from '../../lib/Axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../lib/setAuthToken'

export const signup = (userInfo) => async dispatch => {
    try {
        let success = await Axios.post('/users/sign-up', userInfo);
        dispatch(authUserSuccessful(success.data.message))
        return Promise.resolve(success.data.message);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const signin = (userInfo) => async dispatch => {
    try {
        let success = await Axios.post('/users/sign-in', userInfo);
        const { token } = success.data;
        setAuthToken(token)
        localStorage.setItem('jwtToken', token)
        const decoded = jwt_decode(token)
        dispatch(authUserSignIn(decoded, token))
        return Promise.resolve(decoded);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getTransactions = (id)=> async dispatch =>{
    try{
        let success = await Axios.get(`/users/get-transactions/${id}`)
        dispatch({
            type: TRANSACTION_LIST,
            payload: success.data
        })
    } catch(error){
        return Promise.reject(error)
    }
}

export const addTransaction = (id, name, amount)=> async dispatch =>{
    try{
        let success = await Axios.post(`/users/add-transaction/${id}`,{business:name, cashAmount: amount})
        console.log(success.data)
        dispatch({
            type: ADD_TRANSACTION,
            payload: success.data
        })
    } catch(error){
        return Promise.reject(error)
    }
}

export const changeCredit = (id, amount)=> async dispatch =>{
    try{
        let success = await Axios.post(`/users/change-credit/${id}`, {credit: amount})
        dispatch({
            type: CHANGE_CREDIT,
            payload: success.data
        })
    } catch(error){
        return Promise.reject(error)
    }
}

export const authUserSuccessful = (message) => dispatch => {
    dispatch({
        type: AUTH_USER_SUCCESSFUL,
        payload: message
    })
}


export const authUserSignIn = (decoded, token) => dispatch => {
    console.log(decoded)
    dispatch({
        type: AUTH_USER_SIGN_IN,
        payload: decoded,
        token: token
    })
}

export const handleLogout = ()=> dispatch => {
    dispatch({
        type: AUTH_USER_LOGOUT
    })
}