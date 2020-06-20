import express from 'express'
import sqlite3 from 'sqlite3'
import axios from 'axios';  

import {transformMessages} from './utils.js'

/*
POST can recieve a JSON body- must be parsed with express.JSON() middleware
GET can recieve URL paramaters (/conversations/:usernameValue) or URL queries (/conversations?username=myUsername), but can't recieve a JSON body
*/

//Config
const app = express()
app.use(express.json())     // All post requests should have data encoded in the body as JSON
app.use(express.urlencoded({extended: true}))   //All get requests should have data encoded in the URL (path paramaters and queries)
const db = new sqlite3.Database('./database.db')         
db.run(`CREATE TABLE IF NOT EXISTS messages (
    messageId integer PRIMARY KEY AUTOINCREMENT,
    sender varchar(50) NOT NULL,
    reciever varchar(50) NOT NULL,
    message varchar(1000) NOT NULL,
    date timestamp NOT NULL DEFAULT current_timestamp
)`)
db.run(`CREATE TABLE IF NOT EXISTS users (
    username varchar(50) PRIMARY KEY NOT NULL,
    ipAddress varchar(50) NOT NULL
)`)


//Server
app.post('/connect', (req, res) => {
    const {username, ipAddress} = req.body
    db.run(`REPLACE INTO users 
            VALUES (?, ?)`, [username, ipAddress])
    res.sendStatus(200)
})

app.post('/new-message', (req, res) => {
    const {sender, reciever, message} = req.body

    db.run(`INSERT INTO messages (sender, reciever, message) 
            VALUES (?, ?, ?)`, [sender, reciever, message])

    db.get(`SELECT ipAddress FROM users WHERE username=?`, [reciever], (err1, row) => {
        db.get(`SELECT sender, message, date FROM messages`, (err2, data) => {
            if(err1 || err2) throw err1 || err2

            axios.post(row.ipAddress + '/new-message', data).catch((err) => 
                console.log("Recipient offline. Unable to send message to " + row.ipAddress)
            )
        })
    })
    res.sendStatus(200)
})

app.get('/conversations/:username', (req, res) => {
    const {username} = req.params   //params, not body
    db.all('SELECT sender, reciever, message, date \
    FROM messages \
    WHERE sender=? OR reciever=?', [username, username], (err, messages) => {
        if (err) throw err
        res.send(  transformMessages(messages, username) )
    })
})

const port = 3000
app.listen(port, () => console.log("Server listening on port " + port) )