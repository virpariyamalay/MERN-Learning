const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 50
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }


});


const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;