const formArray = [
    {
      input: {
        type: 'text',
        name: 'username',
        id: 'input-username',
        label: 'Username',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    },
    {
      input: {
        type: 'email',
        name: 'email',
        id: 'input-email',
        label: 'Email',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required', 'isEmail'],
        errorMessages: ['this field is required', 'email is not valid']
      }
    },
    {
      input: {
        type: 'password',
        name: 'password',
        id: 'input-password',
        label: 'password',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    },
    {
      input: {
        type: 'confirmPassword',
        name: 'confirmPassword',
        id: 'input-confirm-password',
        label: 'confirm-password',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['isPasswordMatch', 'required'],
        errorMessages: ['password mismatch', 'this field is required']
      }
    },
    {
      input: {
        type: 'select',
        name: 'gender',
        id: 'input-gender',
        label: 'Select',
        select: true,
        required: true,
        genders: ['male', 'female', 'undefined'],
        helperText: 'Please select your gender',
        style: {
          width: '250px',
          marginTop: '15px'
        },
        validators: ['required'],
        errorMessages: ['this field is required']
      }
    }
  ];
  
  export default formArray;