import React from 'react';

import profilePicture from 'public/profilePicture.svg'

export default function ChatPreview(props) {
    const {person, preview, setSelectedChat} = props
    return (
        <div className="chatPreview" onClick={() => setSelectedChat(person)} >
            <img src={profilePicture} height="60" width="60" alt="Profile picture icon"/>
            <h3>{person}</h3>            
            <p>{preview}</p>
        </div>
    )
}