import React, { useState, useEffect } from 'react';

import TitleBanner from './titleBanner'
import Message from './message'
import MessageBox from './messageBox'

export default function Chat(props) {
    const {username, messages, setSelectedChat, selectedChat} = props

    return (
        <>
            <TitleBanner setValue={setSelectedChat} title={selectedChat}/>
            {messages?.map( (message) => <Message {...message} key={message.timestamp + Date.now()} username={username} /> )}
            <MessageBox {...props}/>
        </>
    )
}