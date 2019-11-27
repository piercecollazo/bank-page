import React, { Component } from 'react'
import { Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Core/Navbar';


const Signin = React.lazy(() => import('./Components/Core/Signin'));
const Signup = React.lazy(() => import('./Components/Core/Signup'));
const Home = React.lazy(() => import('./Components/Core/Home'));
const Account = React.lazy(()=>import('./Components/Account/Account'))
const NotFound = React.lazy(() => import('./Components/Core/NotFound'))


export default class App extends Component {
  render() {
    return (
      <>  
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/sign-up' component={Signup} />
          <Route exact path='/sign-in' component={Signin} />

          <Route path='' component={NotFound} />
        </Switch>
      </>
    )
  }
}
