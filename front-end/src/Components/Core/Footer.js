import React, { Component } from 'react';
import './Footer.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import {Link} from 'react-router-dom'
export default class App extends Component{
    render(){
        return (
            <div className='footer'>
                <br/>
                <p>Made by Alex Collazo, 2019</p>
                <p>Email: piercecollazo@gmail.com</p>
                <Link>
                    <GitHubIcon to='https://github.com/piercecollazo/bank-page' />
                </Link>
            </div>
        )
    }
}