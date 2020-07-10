import React from 'react';

import newMessage from 'public/newMessage.png'

import TitleBanner from './titleBanner'
import ChatPreview from './chatPreview'


export default function SelectChat(props) {
    const {previews, setSelectedChat, setNewChat, username, setUsername} = props

    return (
        <> 
            <TitleBanner setValue={setUsername} title={username} />
            {previews?.map( ([person, lastMessage]) => 
                <ChatPreview person={person} key={person} preview={lastMessage} setSelectedChat={setSelectedChat}/>
            )}
            <img src={newMessage} alt="New message" height="65" width="65" onClick={() => setNewChat(true)} />

        </>
    )
}
