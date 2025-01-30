const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');

// Importing Routes from routes folder 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
console.log(path.join(__dirname, 'public'));  // Add this line
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Add this line to use req.body

main()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

    //console.log('Connected to MongoDB');
}

// let Chat1 = new Chat({
//     from: 'ram',
//     to: 'shyam',
//     message: 'Hello shyam i am ram please send papersheet',
// });

// Chat1.save()
//     .then((res) => {
//         console.log(res);
//     }).catch((err) => {
//         console.log(err);
//     });



//index route for dispalying all the chats from the database
app.get('/chats', async (req, res) => {
    let chats = await Chat.find();
    res.render('index', { chats });
    //console.log(chats);

});

//new route for adding new chat
app.get('/chats/new', (req, res) => {
    res.render('new');
});

//post route for adding new chat to the database
app.post('/chats', (req, res) => {
    let { from, to, message } = req.body;

    let newChat = new Chat(
        {
            from: from,
            to: to,
            message: message,
            date: Date.now()
        });
    newChat.save().then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/chats');
    // console.log(req.body);
    //res.render('index', { newChat });

});

//show route for displaying a particular chat
app.get('/', (req, res) => {
    res.send('Root Is Working');
});

app.listen(port, (req, res) => {
    console.log('Server is running on port 8080');
});