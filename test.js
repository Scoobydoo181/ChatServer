import {transformMessages} from './utils.js'

test("Test transformMessages", () => {

    let messages = [
        {sender: 'Robert', reciever: 'Annie', message: 'Hello World!!'},
        {sender: 'Lindsey', reciever: 'Michael', message: 'Hello World!!'},
        {sender: 'John', reciever: 'Michael', message: 'Hello World!!'},
        {sender: 'Michael', reciever: 'Penny', message: 'Hello World!!'},
        {sender: 'Annie', reciever: 'Lindsey', message: 'Hello World!!'},
        {sender: 'Sally', reciever: 'John', message: 'Hello World!!'},
        {sender: 'Oscar', reciever: 'Alex', message: 'Hello World!!'},
        {sender: 'Phil', reciever: 'Penny', message: 'Hello World!!'},
        {sender: 'Penny', reciever: 'Desiree', message: 'Hello World!!'},
        {sender: 'John', reciever: 'Robert', message: 'Hello World!!'},
        {sender: 'Lindsey', reciever: 'Phil', message: 'Hello World!!'},
        {sender: 'Phil', reciever: 'Desiree', message: 'Hello World!!'},
        {sender: 'Oscar', reciever: 'Annie', message: 'Hello World!!'},
        {sender: 'Alex', reciever: 'Desiree', message: 'Hello World!!'},
        {sender: 'Desiree', reciever: 'Phil', message: 'Hello World!!'},
        {sender: 'John', reciever: 'Lindsey', message: 'Hello World!!'},
        {sender: 'Sally', reciever: 'Oscar', message: 'Hello World!!'},
        {sender: 'Robert', reciever: 'Alex', message: 'Hello World!!'},
        {sender: 'Oscar', reciever: 'Sally', message: 'Hello World!!'},
        {sender: 'Annie', reciever: 'Robert', message: 'Hello World!!'},
        {sender: 'Penny', reciever: 'Michael', message: 'Hello World!!'}
    ]
    
    let username = 'Penny'
    let messageObj = {
      Michael: [
        { sender: "Michael", reciever: "Penny", message: "Hello World!!" },
        { sender: "Penny", reciever: "Michael", message: "Hello World!!" },
      ],
      Phil: [
          { sender: "Phil", reciever: "Penny", message: "Hello World!!" }
        ],
      Desiree: [
          { sender: "Penny", reciever: "Desiree", message: "Hello World!!" }
        ],
    }

    expect(transformMessages(messages, username) ).toStrictEqual(messageObj)
})