import React from 'react';
import { Button } from '@material-ui/core'

const ButtonClass = (props) => {

    return (
        <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={props.onClick}
            style={props.style}
        >
            {props.children}
        </Button>
    )

}

export default ButtonClass;