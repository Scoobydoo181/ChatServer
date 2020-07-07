import React from 'react';

export default function Message(props) {
    const {sender, username, message, timestamp} = props
    return (
        <div className={"message" + (sender === username ? " sent" : " recieved") }>
            <p>{message}</p>
            <p>{timestamp}</p>
        </div>
    )
}