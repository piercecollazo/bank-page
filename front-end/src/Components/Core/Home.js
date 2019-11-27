import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signin from './Signin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



class Home extends Component {

    componentDidMount(){
        if (this.props.authUser.isAuthenticated){
            this.props.history.push('/account')
        }
    }

    render() {
        return (

            <Grid container direction='row' justify='flex-end' spacing={2}>
                <Grid item xs={8}>
                    <Paper style={{width:'100%', textAlign:'center', padding: 5}}>
                        <h3>Welcome to Bank Page!</h3>
                        <br />
                        <h5>Please create an account and sign in to check out this work in progress</h5>
                        <br />
                        <p>This current release of 'Bank Page' is a simple Fullstack application showing off how to use React, Node.js, Redux, Material-UI, and other dependencies to send and recieve information, allowing users to influence a faux bank account through transactions and credit score manipulation in a simple interface. In the near future visual improvements will be made, as well as 'quality of life' and functionality updates, as well as eventual AWS deployment. Please be sure to check the github for further information on the project itself, and I'd love to hear your feedback!</p>
                        <br />
                    </Paper>
                </Grid>

                <Grid item xs={4}>
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
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default connect(mapStateToProps, null)(Home);