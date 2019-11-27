import React from 'react';
import {TextField} from '@material-ui/core';
import { TextValidator} from 'react-material-ui-form-validator';

const InputClass = (props) => {
  const { input } = props;
  let dynamicInputField = null 
  switch (input.type) {
    
    case('title'):
   
    dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type={input.type}
                              value={props.title}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                        />
    break;
  
    case('text'):
   
      dynamicInputField = <TextValidator 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props.username}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                onChange={props.handleInputChange}
                          />
      break;

    case('email'):
        dynamicInputField = <TextValidator 
                                id={input.id}
                                label={input.label}
                                required={input.required}
                                style={input.style}
                                name={input.name}
                                type={input.type}
                                value={props.email}
                                validators={input.validators}
                                errorMessages={input.errorMessages}
                                onChange={props.handleInputChange}
                            />
        break;                   
      
    case('password'):
        dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type={input.type}
                              value={props.password}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                            />
        break; 
    case('confirmPassword'):
        dynamicInputField = <TextValidator 
                              id={input.id}
                              label={input.label}
                              required={input.required}
                              style={input.style}
                              name={input.name}
                              type='password'
                              value={props.confirmPassword}
                              validators={input.validators}
                              errorMessages={input.errorMessages}
                              onChange={props.handleInputChange}
                            />
        break;     
    case('multiline'):
                 
      dynamicInputField = <TextField 
                            id={input.id}
                            label={input.label}
                            required={input.required}
                            style={input.style}
                            name={input.name}
                            type={input.name}
                            onChange={props.handleInputChange}
                            rows={input.rows}
                            multiline={input.multiline}
                          />

      break;

    default: 
      return null;
  }



  return (
    <>
      {dynamicInputField}
    </>
  )
}

export default InputClass