import React, { useState, useEffect } from 'react';
import axios from 'axios'
import io from 'socket.io-client'

import Login from './login'
import NewChat from './newChat'
import SelectChat from './selectChat'
import Chat from './chat'

export default function Home(props) {
    const [username, setUsername] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null)
    const [newChat, setNewChat] = useState(null)
    const [socket, previews, messages, appendMessage] = useMessages(username, selectedChat)
    

    const displayHome = () => {
        if (!username) 
            return <Login setUsername={setUsername}/>
        else if(newChat)
            return <NewChat setSelectedChat={setSelectedChat} setNewChat={setNewChat} />
        else if(!selectedChat)
            return <SelectChat previews={previews} 
                               setSelectedChat={setSelectedChat} 
                               username={username}
                               setUsername={setUsername} 
                               setNewChat={setNewChat} />
        else
            return <Chat messages={messages} 
                         appendMessage={appendMessage} 
                         username={username} 
                         selectedChat={selectedChat}
                         setSelectedChat={setSelectedChat} 
                         socket={socket} />
    }
    
    return displayHome() 
}

function useMessages(username, selectedChat) {
    const [messages, setMessages] = useState(null)
    const [previews, setPreviews] = useState(null)
    const [conversations, setConversations] = useState(null)
    const [socket, _] = useState( io("http://localhost:3000/") );

    const appendMessage = (sender) => (newMessage) => {
        let newConvos = conversations
        if(newConvos[sender])
            newConvos[sender].push(newMessage)
        else
            newConvos[sender] = [newMessage]
        setConversations(newConvos)
    }

    useEffect(() => {
        if(username) {
            let isMounted = true
            axios.get(`http://localhost:3000/conversations/${username}`).then( ({data}) => {
                if(isMounted)
                    setConversations(data)
            })
            
            return () => {isMounted = false}
        }
    }, [username]);

    useEffect(() => {
        if(conversations) {
            let chats = Object.keys(conversations).map(person => {
                let chat = conversations[person]
                let last = chat[chat.length -1 ].message
                return [person, last]
            })
            setPreviews(chats)
        }
    }, [conversations]);

    useEffect(() => {
        if(selectedChat)
            setMessages(conversations[selectedChat] || [])
    }, [conversations, selectedChat]);

    useEffect(() => {
        socket.on("message", (message) => {
            if(message.reciever === username) 
                appendMessage(message.sender)(message)
        })
    }, [username]);

    return [socket, previews, messages, appendMessage(selectedChat) ]
}