import React, { useState } from 'react';

export default function MessageBox(props) {
    const {username, selectedChat, socket, appendMessage} = props
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        socket.emit("message", {
          sender: username,
          reciever: selectedChat,
          message: message,
        });
    }

    const handleChange = (event) => setMessage(event.target.value);

    return (
        <form className="messageBox" onSubmit={handleSubmit}>
            <input type="text" value={message} name="message" onChange={handleChange} />
            <button type="submit">Send</button>
        </form>
    )
}