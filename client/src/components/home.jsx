import React, { useState, useEffect } from 'react';
import axios from 'axios'
import io from 'socket.io-client'

import Login from 'login'
import SelectChat from 'selectChat'
import Chat from 'chat'

export default function Home(props) {
    const [username, setUsername] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null)
    const [socket, people, messages, appendMessage] = useMessages(username, selectedChat)
    

    const homeDisplay = () => {
        if (!username) 
            return <Login setUsername={setUsername}/>
        else if(!selectedChat)
            return <SelectChat people={people} setSelectedChat={setSelectedChat}/>
        else
            return <Chat messages={messages} 
                         appendMessage={appendMessage} 
                         username={username} 
                         selectedChat={selectedChat} 
                         socket={socket} />
    }
    
    return homeDisplay() 
}

function useMessages(username, selectedChat) {
    const [messages, setMessages] = useState(null)
    const appendMessage = (sender) => (newMessage) => {
        let newConvos = conversations
        if(newConvos[sender])
            newConvos[sender].push(newMessage)
        else
            newConvos[sender] = [newMessage]
        setConversations(newConvos)
    }
    const [people, setPeople] = useState(null)
    const [conversations, setConversations] = useState(null)
    const [socket, _] = setState( io("http://localhost:3000") );

    useEffect(() => {
        if(username)
            (async () => setConversations(await axios.get(`http://localhost:3000/conversations/${username}`).data))()
    }, [username]);

    useEffect(() => {
        if(conversations)
            setPeople(Object.keys(conversations))
    }, [conversations]);

    useEffect(() => {
        if(selectedChat)
            setMessages(conversations[selectedChat])
    }, [conversations, selectedChat]);

    useEffect(() => {
        socket.on("message", ({sender, reciever, message, date}) => {
            if(reciever != username) return

            appendMessage(sender)(message)
  
        })
    }, [username]);

    return [socket, people, messages, appendMessage(selectedChat) ]
}