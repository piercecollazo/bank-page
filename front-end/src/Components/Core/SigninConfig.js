const formArray = [
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
    }
  ];
  
  export default formArray;