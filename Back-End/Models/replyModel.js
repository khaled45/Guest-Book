var mongoose = require('mongoose')
let replyModel = new mongoose.model('reply', {
    _id: mongoose.Schema.Types.ObjectId,
    reply: {
        type: String
    },
    createdIn: {
        type: Object
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guest'
    },
    messageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }
})
module.exports = replyModel