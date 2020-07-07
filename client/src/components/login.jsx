import React, { useState } from 'react';
import axios from 'axios'
import crypto from 'crypto'

export default function SelectChat(props) {
    const {setUsername} = props
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [loginFailed, setLoginFailed] = useState(false)
    const [registerFailed, setRegisterFailed] = useState(false)

    const hash = (value) => crypto.createHash("md5").update(value).digest("hex");

    const handleUsernameChange = (e) => setUsernameValue(e.target.value);
    const handlePasswordChange = (e) => setPasswordValue(e.target.value);

    const handleLogin = async () => {
        let res = await axios.post('http://localhost:3000/login', {username: usernameValue, password: hash(passwordValue)})
        let validLogin = res.data
        if(validLogin)
            setUsername(usernameValue)
        else
            setLoginFailed(true)
            setUsernameValue("")
            setPasswordValue("")
        }
    const handleRegister = async () => {
        let res = await axios.post('http://localhost:3000/register', {username: usernameValue, password: hash(passwordValue)})
        let validUsername = res.data
        if(validUsername)
            setUsername(usernameValue)
        else {
            setRegisterFailed(true)
            setUsernameValue("")
            setPasswordValue("")
        }
    }

    return (
        <form className="loginForm" onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
            {registerFailed ? <p className="failed">Username already in use, please choose a different one</p> : ""}
            {loginFailed ? <p className="failed">Invalid username or password</p> : ""}
            
            <input type="text" name="username" value={usernameValue} onChange={handleUsernameChange}/>
            <p>Username</p>

            <input type="password" name="password" value={passwordValue} onChange={handlePasswordChange}/>
            <p>Password</p>

            <button className="login" onClick={handleLogin} >Log in</button>
            <button className="register" onClick={handleRegister}>Register</button>

        </form>
    )
}