import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import { handleLogout } from '../../redux/actions/authAction';
import {withRouter} from 'react-router';

const styles = {
    rightToolbar: {
        marginLeft: 'auto',
        marginRight: -12
    },
    navLinkStyle: {
        textDecoration: 'none',
        color: 'white',
        marginRight: 10
    },
    signupAndSignin: {
        marginLeft: '10px'
    },
    activeLinks: {
        color: 'white',
        textDecoration: 'underline white',
        marginLeft: 'auto'
    }
}


class Navbar extends Component {
    logout = ()=>{
        
        localStorage.removeItem('jwtToken')
        this.props.handleLogout();
        this.props.history.push('/')
    }

    render() {
        
        let navigation = null;

        if (this.props.authUser.isAuthenticated) {
            navigation = (
                <>
                    <NavLink
                        exact
                        to='/user-profile'
                        className={[this.props.classes.navLinkStyle, this.props.classes.signupAndSignin].join(' ')}
                        activeStyle={{color: 'white', textDecoration: 'underline white'}}
                    >
                        {`Welcome back, ${this.props.authUser.user.name}` || 'Username not fetched'}
                    </NavLink>

                    <NavLink
                        exact
                        to='/'
                        className={[this.props.classes.navLinkStyle, this.props.classes.signupAndSignin].join(' ')}
                        activeStyle={{color: 'white', textDecoration: 'underline white'}}
                        onClick={this.logout}
                    >
                        Log Out
                    </NavLink>

                </>
            )
        } else {
            navigation = (
                <>
                    <NavLink 
                        exact 
                        className={[this.props.classes.navLinkStyle, this.props.classes.signupAndSignin].join(' ')}
                        activeStyle={{color: 'white', textDecoration: 'underline white'}}
                        to='/sign-up'>
                            Sign up
                    </NavLink>

                    <NavLink 
                        exact 
                        className={[this.props.classes.navLinkStyle, this.props.classes.signupAndSignin].join(' ')}
                        activeStyle={{color: 'white', textDecoration: 'underline white'}}
                        to='/sign-in'>
                            Sign in
                    </NavLink>

                </>
            )
        }

        return (
           <AppBar position='static'>
               <Toolbar>
                   <NavLink 
                     exact
                     to='/'
                     className={this.props.classes.navLinkStyle}
                     activeStyle={styles.activeLinks}
                     >Bank Page</NavLink>
                     

                     <section className={this.props.classes.rightToolbar}>
                        
                        {navigation}

                     </section>
               </Toolbar>
           </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default withRouter(connect(mapStateToProps, {handleLogout})(withStyles(styles)(Navbar)));