import readlineSync from "readline-sync"
import axios from 'axios'

export function transformMessages(messages, username) {
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

export function stringifyMessages(username, person, conversations) {
    return conversations[person].map(record => {
        let output = [record.message, record.date, record.sender]

        return record.sender === username
            ? output.map((x) => x.toString().padStart(80)).join("\n")
            : output.map((x) => x.padEnd(80)).join("\n")
    }).join('\n\n')
}

export function messageLoop(username, conversations, people, server) { 
    while(true) {
        let index = readlineSync.keyInSelect(["New Conversation", ...people], 'Select a conversation: ', {cancel: 'Exit'})
        //"Exit" was selected 
        if(index === -1) return     

        let person
        if(index === 0) {//"New Conversation" was selected
            let newConvo = readlineSync.question('Enter a recipient: ')
            people.push(newConvo)
            person = newConvo
        } else {
            person = people[index - 1]
            console.log( stringifyMessages(username, person, conversations) )
        }

        process.stdout.write('\n' +username)
        
        readlineSync.promptLoop( (input) => {
            const endLoop = input === "q"
            if(!endLoop) {
                let date = (new Date(Date.now()) ).toISOString().replace('T', ' ').slice(0, 19)

                //Displays the send message with the timestamp and sender each on their own line, with 80 characters of left padding
                console.log([input, date, username].map((x) => x.padStart(80)).join("\n"))
                conversations[person].push( {
                    sender: username,
                    reciever: person,
                    message: input,
                    date: date 
                })

                axios.post(server + '/new-message', {
                    sender: username, 
                    reciever: person, 
                    message: input
                })
                process.stdout.write("\n" + username)
            }
            return endLoop
        })
    }
}

