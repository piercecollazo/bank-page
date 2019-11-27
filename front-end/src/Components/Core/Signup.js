import React, { Component } from 'react'
import { connect } from 'react-redux';

import './Signup.css';
import Input from '../../Factory/Input/Input'
import ButtonClass from '../../Factory/Button/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import formArray from './SignupConfig';
import { authUserSuccessful, 
         signup } from '../../redux/actions/authAction';
import Spinner from '../../Factory/Spinner/Spinner'
import MessageBar from '../../Factory/MessageBar/MessageBar';

class Signup extends Component {

  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: ''
    },
    submitted: false,
    redirectToggle: false,
    countdownSecond: 4
  }

  componentDidMount() {
    if(this.props.authUser.isAuthenticated){
      this.props.history.push('/')
  }
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        const { formData } = this.state;
        if (value !== formData.password) {
            return false;
        }
        return true;
    });
  }


  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  }


  successfullySignedUp = () => {
    

    this.setState({
      submitted: false,
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
      }
    })
  }

  countDownRedirect = () => {
    let count = 4
    let countdownTimer = setInterval(function(){
      count--

      this.setState({
        countdownSecond: count
      })

      if(count <= 0){
        clearInterval(countdownTimer)
        this.setState({
          redirectToggle: false,
          countdownSecond:4
        })
        this.props.history.push('/sign-in')
      }
    }.bind(this), 1000);
  }

  handleSubmit = (event) => {

      event.preventDefault();

      this.setState({ 
          submitted: true, 
        }, () => {

            this.props.signup(this.state.formData)
                .then(() => {
                  this.successfullySignedUp();
                  this.setState({
                    redirectToggle:true
                  })

                  this.countDownRedirect()
                })
                .catch(error => {
                });


      });
  }

  render() {
    
    const {submitted} = this.state;

    let form = (
      formArray.map((field, index) => {
          
        return (
          <div key={field.input.label}>
              <Input 
                {...field}
                {...this.state.formData}
                handleInputChange={this.handleChange}
              />
              <br />
          </div>
        )
      })
    )
      
    return (
      <>
          {this.props.handleMessage.message !== null ? <MessageBar
                                                        fontColorStyle={this.props.handleMessage.fontColorStyle}
                                                      >{this.props.handleMessage.message} {this.state.redirectToggle ? `Redirecting in ${this.state.countdownSecond}...` : ''}</MessageBar>: ''}
          <ValidatorForm className='Form' onSubmit={this.handleSubmit}>
            {
                submitted ? <Spinner /> : form
            }
            <br />
            
            <ButtonClass 
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitted}
              > 
              {
                  (submitted && 'Your form is submitted!')
                  || (!submitted && 'Submit')
              }
            </ButtonClass>
      
        </ValidatorForm>

      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    handleMessage: state.handleMessage
  }
}

export default connect(mapStateToProps, { authUserSuccessful, signup })(Signup)