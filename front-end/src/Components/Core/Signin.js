import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import {withRouter} from 'react-router';

import './Signup.css';
import Input from '../../Factory/Input/Input'
import ButtonClass from '../../Factory/Button/Button';
import formArray from './SigninConfig';
import { authUserSuccessful, 
         signin } from '../../redux/actions/authAction';
import Spinner from '../../Factory/Spinner/Spinner';
import MessageBar from '../../Factory/MessageBar/MessageBar';


class Signin extends Component {
    state = {
        formData: {
          email: '',
          password: '',
        },
        submitted: false,
      }
    
      componentDidMount() {
        if(this.props.authUser.isAuthenticated){
            this.props.history.push('/account')
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
    
    
      successfullySignedIn = () => {
        this.setState({
          submitted: false,
          formData: {
            email: '',
            password: ''
          }
        })
        console.log(this.props)
        this.props.history.push('/account')
      }
    
      handleSubmit = (event) => {
    
          event.preventDefault();
    
          this.setState({ 
              submitted: true, 
            }, () => {
    
                this.props.signin(this.state.formData)
                    .then(() => {
                      this.successfullySignedIn();
                    })
                    .catch(error => {
                        console.log(error)
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
                                                      >{this.props.handleMessage.message}</MessageBar>: ''}
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
        
export default withRouter(connect(mapStateToProps, { authUserSuccessful, signin })(Signin));