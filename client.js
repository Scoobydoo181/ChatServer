import axios from 'axios'
import readlineSync from 'readline-sync'
import express from 'express'

import {messageLoop} from './utils.js'


//Config
const server = 'http://localhost:3000'
const port = Math.floor( Math.random() * 10000 )
let conversations = {}
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//Server
app.post('new-message', (req, res) => {
    const {sender, message, date} = req.body
    if(conversations[sender])
        conversations[sender].push( [message, date, sender].map((x) => x.padEnd(80)).join("\n") )
    else
        conversations[sender] = [ [message, date, sender].map((x) => x.padEnd(80)).join("\n") ]
    res.sendStatus(200)     
})

app.listen(port, async () => {
    while(true) {
        const username = readlineSync.question("Enter your username: ")
        if(username === 'q') return
        await axios.post(server + '/connect', {username: username, ipAddress: "http://localhost:" + port + "/"})
        
        conversations = (await axios.get(server + '/conversations/' + username)).data
        
        let people = []
        for(let person in conversations) //"in", not "of": get the properties of the conversations object
            people.push(person)

        messageLoop(username, conversations, people, server)
    }
})

