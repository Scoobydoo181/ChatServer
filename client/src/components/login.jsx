import React, { useState } from 'react';
import crypto from 'crypto'

export default function SelectChat(props) {
    const {setUsername} = props
    
    return (
        <form className="loginForm">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" />

            <button className="login">Log in</button>
            <button className="register">Register</button>

        </form>
    )
}