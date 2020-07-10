import React, { useState } from 'react';

export default function MessageBox(props) {
    const {username, selectedChat, socket, appendMessage} = props
    const [chatText, setChatText] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        let today = new Date()
        let time = today.toLocaleTimeString()
        //Format: Jun 04, 05:08 AM
        let timestamp = today.toDateString().slice(4, 10) + 
                                                     ', ' + 
                             time.slice(0, time.length-6) + 
                                                      ' ' + 
                     time.slice(time.length-2, time.length)

        let message = {
          sender: username,
          reciever: selectedChat,
          message: chatText,
          timestamp: timestamp,
        };
        socket.emit("message", message);
        appendMessage(message)
        setChatText('')
    }

    const handleChange = (event) => setChatText(event.target.value);

    return (
        <form className="messageBox" onSubmit={handleSubmit}>
            <input type="text" value={chatText} name="message" onChange={handleChange} />
            <button type="submit">Send</button>
        </form>
    )
}