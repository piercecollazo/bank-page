import { AUTH_USER_SUCCESSFUL, AUTH_USER_FAILURE} from '../actionTypes/actionTypes';

const initialState = {
    message: null,
    fontColorStyle: 'black'
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_USER_SUCCESSFUL:
        return {
            message: 'You are now logged in!',
            fontColorStyle: 'blue'
        };

        case AUTH_USER_FAILURE:
        return {
            message: action.payload,
            fontColorStyle: 'red'
        };

        default: 
            return state;
    }
}
