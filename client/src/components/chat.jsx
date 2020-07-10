import React from 'react';

import TitleBanner from './titleBanner'
import Message from './message'
import MessageBox from './messageBox'

export default function Chat(props) {
    const {username, messages, setSelectedChat, selectedChat} = props

    return (
        <>
            <TitleBanner setValue={setSelectedChat} title={selectedChat}/>
            {messages?.map( (message, index) => <Message {...message} key={index} username={username} /> )}
            <MessageBox {...props}/>
        </>
    )
}