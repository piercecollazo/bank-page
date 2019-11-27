import jwtDecode from 'jwt-decode';
import { authUserSignIn, handleLogout } from '../redux/actions/authAction'
import setAuthToken from './setAuthToken'

const checkTokenAuth = (store) => {
    let jwtToken = localStorage.getItem('jwtToken');
    let decoded;

    if (jwtToken){
        setAuthToken(jwtToken)
        decoded = jwtDecode(jwtToken);
        store.dispatch(authUserSignIn(decoded, jwtToken));
        const currentTime = Date.now() / 1000;

        if( decoded.exp < currentTime){
            store.removeItem('jwtToken')
            store.dispatch(handleLogout());
            window.location.href = '/sign-in'
        }
    }
    return;
}

export default checkTokenAuth;