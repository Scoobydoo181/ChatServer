import express from 'express'
import sqlite3 from 'sqlite3'
import socketIO from 'socket.io'

/*
POST can recieve a JSON body- must be parsed with express.JSON() middleware
GET can recieve URL paramaters (/conversations/:usernameValue) or URL queries (/conversations?username=myUsername), but can't recieve a JSON body
*/

//Config
const app = express()
app.use(express.json())     // All post requests should have data encoded in the body as JSON
app.use(express.urlencoded({extended: true}))   //All get requests should have data encoded in the URL (path paramaters and queries)
app.use(express.static('./client/build'))
const db = new sqlite3.Database('./database.db') 


//Messages database
db.run(`CREATE TABLE IF NOT EXISTS messages (
    messageId integer PRIMARY KEY AUTOINCREMENT,
    sender varchar(50) NOT NULL,
    reciever varchar(50) NOT NULL,
    message varchar(1000) NOT NULL,
    timestamp varchar(20) NOT NULL
)`)

db.run(`CREATE TABLE IF NOT EXISTS users (
    username varchar(50) PRIMARY KEY,
    password varchar(50) NOT NULL
)`)

//Server
app.get('/', (req, res) => {
    res.sendFile('./client/build/index.html')
})

app.get('/conversations/:username', (req, res) => {
    const {username} = req.params   //params, not body
    db.all('SELECT sender, reciever, message, timestamp \
    FROM messages \
    WHERE sender=? OR reciever=?', [username, username], (err, messages) => {
        if (err) throw err
        res.send(  transformMessages(messages, username) )
    })
})

app.post('/login', (req, res) => {
    const {username, password} = req.body
    db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, data) => {
        if(err) throw err
        res.send(!!data)
    })
})

app.post('/register', (req, res) => {
    const {username, password} = req.body
    db.run('INSERT INTO users VALUES (?, ?)', [username, password], (err) => {
        res.send(!err)
    })
})

const port = process.argv[2] || 8080
const server = app.listen(port, () => console.log("Server listening on port " + port) )

//Socket
const io = socketIO(server)

io.on('connection', (socket) => {
    socket.on('message', ({sender, reciever, message, timestamp}) => {
        db.run(`INSERT INTO messages (sender, reciever, message, timestamp) 
            VALUES (?, ?, ?, ?)`, [sender, reciever, message, timestamp])
    })
    socket.on('error', console.log)
})

//Util function
function transformMessages(messages, username) {
    //Returns a function that returns true if the passed person is a sender or reciever of the passed message
    const includesPerson = person => message => message.sender === person || message.reciever === person
    const personalMessages = messages.filter( includesPerson(username) )
    //Transform the list of messages into a set of all unique senders and recievers
    const people = new Set(
      personalMessages
        .flatMap( message => [message.sender, message.reciever] )
        .filter( x => x != username )
    )

    let conversations = {}
    for(let person of people)   //for of gives you values, for in gives you indexes
        conversations[person] = personalMessages.filter( includesPerson(person) )
    return conversations
}
