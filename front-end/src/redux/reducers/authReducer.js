import { AUTH_USER_SIGN_IN, AUTH_USER_LOGOUT, ADD_TRANSACTION, CHANGE_CREDIT, TRANSACTION_LIST} from '../actionTypes/actionTypes';
import { jwtDecodeTokenAndSetUser} from './authReducerHelper';

const initialState = {
    isAuthenticated: false, 
    user: null,
    transactions: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER_SIGN_IN:
            return jwtDecodeTokenAndSetUser(state, action.token)

        case AUTH_USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        case TRANSACTION_LIST:
            return{
                ...state,
                transactions:action.payload
            }

        case ADD_TRANSACTION:
            let newTrans = [...state.transactions, action.payload]
            return{
                ...state,
                transactions: newTrans
            }
        
        case CHANGE_CREDIT:
            return {
                ...state,
                user: action.payload
            }
        

        default: 
            return state;
    }
}