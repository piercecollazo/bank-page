import React, { Component } from 'react';
import { connect } from 'react-redux';
import Signin from './Signin';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from './Footer'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Carousel from '../Parts/Carousel'



class Home extends Component {

    componentDidMount(){
        if (this.props.authUser.isAuthenticated){
            this.props.history.push('/account')
        }
    }

    render() {
        return (
            <div className='homeContent'>
            <Grid container direction='row' justify='flex-end' spacing={2} style={{marginLeft:'5%'}}>
                <Grid item xs={8}>
                    <Paper style={{width:'100%', textAlign:'center', padding: 5}}>
                        <h3>Welcome to Bank Page!</h3>
                        <br />
                        <h5>Please create an account and sign in to check out this work in progress. Fake credentials are fine and encouraged on sign up!</h5>
                        <br />
                        <p>This current release of 'Bank Page' is a simple Fullstack application showing off how to use React, Node.js, Redux, Material-UI, and other dependencies to send and recieve information, allowing users to influence a faux bank account through transactions and credit score manipulation in a simple interface. This project was completed in a few days, but is occasionally updated with new functionality and visual fidelity. As an on-going work in progress, this project plays host to experiments with new concepts I pick up, both in front end and back end development using tools and platforms such as MongoDB, AWS, and more to practice deployment of a functional and useful web app.</p>
                        <br />
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Card style={{width:280}}>
                        <CardContent>
                            <h3 style={{marginBottom: -50}}>Welcome</h3>
                            <Signin />
                            <br />
                            <Link to='/sign-up'>Need an account? Sign up here!</Link>
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <Grid container direction='row' justify='flex-end' spacing={10} style={{marginLeft:'15%'}}>
                <Grid item xs={6}>
                    <Carousel />
                </Grid>

                <Grid item xs={6}>
                <Card style={{width:280}}>
                        <CardContent>
                            <h3 style={{marginBottom: -30}}>What's coming soon?</h3>
                            <br/>
                            <List>
                                <ListItem>
                                    <ListItemText primary='A calendar budget tracker' />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Credit score planning' />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='More account creation options(savings, investment, etc.)' />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='information models' />
                                </ListItem>
                            </List>

                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Footer />
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