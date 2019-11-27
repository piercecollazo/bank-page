import jwtDecode from 'jwt-decode';

const stateHelperFunc = (oldState, newState) => {
    return {
        ...oldState,
        ...newState
    }
}

export const jwtDecodeTokenAndSetUser = (oldState, token) => {
    let decoded = jwtDecode(token);

    return stateHelperFunc(oldState, {
        isAuthenticated: true,
        user:{
            email: decoded.email,
            name: decoded.name,
            id: decoded.id,
            balance: decoded.balance,
            creditScore: decoded.creditScore,
            accountNumber: decoded.accountNumber
        }
    })
}