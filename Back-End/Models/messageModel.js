var mongoose = require('mongoose')
let messageModel = new mongoose.model('message', {
    _id: mongoose.Schema.Types.ObjectId,
    message: {
        type: String
    },
    createdIn: {
        type: Object
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest'
    },
    replies: [{
        type: Object
    }]
})
module.exports = messageModel