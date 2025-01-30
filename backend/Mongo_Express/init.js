const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


main()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}
//initial data for chat
Chat.insertMany([
    {
        "from": "ram",
        "to": "shyam",
        "message": "Hello Shyam, I am Ram. Please send the papersheet."
    },
    {
        "from": "rahul",
        "to": "shyam",
        "message": "Hello, call me."
    },
    {
        "from": "deep",
        "to": "dhruv",
        "message": "Hey Dhruv, are you coming to the meeting?"
    },
    {
        "from": "anshul",
        "to": "deep",
        "message": "Deep, can you share the project files?"
    },
    {
        "from": "rohit",
        "to": "amit",
        "message": "Amit, let's meet at 5 PM."
    },
    {
        "from": "kavya",
        "to": "neha",
        "message": "Neha, are you free for a call?"
    },
    {
        "from": "ajay",
        "to": "vikas",
        "message": "Vikas, I need your help with the assignment."
    },
    {
        "from": "priya",
        "to": "rohan",
        "message": "Rohan, the event details have changed."
    },
    {
        "from": "sneha",
        "to": "megha",
        "message": "Megha, let's plan a trip this weekend!"
    },
    {
        "from": "arjun",
        "to": "manish",
        "message": "Manish, did you receive my email?"
    }
]);


