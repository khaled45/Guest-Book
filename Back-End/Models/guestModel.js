var mongoose = require('mongoose')
let geustModel = new mongoose.model('guest', {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    birthday: {
        type: Date
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: Object
    },
    Zip: {
        type: Number
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }]
})
module.exports = geustModel