import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function Chat(props) {
    const {selectedChat, messages} = props

    return (
        <>
            {messages.map( (message) => <Message {...message} /> )}
            <MessageBox {...props}/>
        </>
    )
}