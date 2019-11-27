import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signin from './Signin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';



class Home extends Component {

    componentDidMount(){
        if (this.props.authUser.isAuthenticated){
            this.props.history.push('/account')
        }
    }

    render() {
        return (
            <div>
                <h5>
                This is a placeholder. Please sign in to see the account page.
                </h5>
                <Card style={{width:280}}>
                    <CardContent>
                        <h3 style={{marginBottom: -50}}>Welcome</h3>
                        <Signin />
                        <br />
                        <Link to='/signup'>Need an account? Sign up here!</Link>
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default connect(mapStateToProps, null)(Home);