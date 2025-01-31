const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

// Importing Routes from routes folder 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
console.log(path.join(__dirname, 'public'));  // Add this line
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Add this line to use req.body
app.use(methodOverride('_method'));

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

//edit route for editing a particular chat
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params;
    let e_chat = await Chat.findById(id);
    res.render('edit', { e_chat });

});


//update route for updating a particular chat
app.put('/chats/:id', async (req, res) => {
    let id = req.params.id.trim();// trim is used to remove the white spaces from the string
    let { message: new_message } = req.body;
    console.log(new_message);
    let u_chat = await Chat.findByIdAndUpdate(id, { message: new_message, date: Date.now() }, { runValidators: true, new: true });
    console.log(u_chat);
    res.redirect('/chats');
});

//delete route for deleting a particular chat
app.delete('/chats/:id', async (req, res) => {
    let id = req.params.id.trim();
    let d_chat = await Chat.findByIdAndDelete(id);
    console.log(d_chat);
    res.redirect('/chats');
});

app.listen(port, (req, res) => {
    console.log('Server is running on port 8080');
});