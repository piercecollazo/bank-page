import React from 'react';

const MessageBar = (props) => {
    return (
        <h3 
            style={{color: props.fontColorStyle}}
        >{props.children}</h3>
    )
}

export default MessageBar;