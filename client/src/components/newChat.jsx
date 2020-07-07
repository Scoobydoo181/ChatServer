import React, {useState} from 'react';

import TitleBanner from './titleBanner';

export default function NewChat(props) {
    const {setSelectedChat, setNewChat} = props
    const [person, setPerson] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setSelectedChat(person)
        setNewChat(null)
    }
    return (
        <>
            <TitleBanner title="New chat" setValue={setNewChat}/>
            <form onSubmit={handleSubmit}>
                <input type="text" name="newChat" value={person} onChange={(e) => setPerson(e.target.value) }/>
                <button type="submit">Create Chat</button>
            </form>
        </>
    )
}