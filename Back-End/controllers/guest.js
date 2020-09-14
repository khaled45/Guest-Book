var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var verifyToken = require('./Auth');

var guestModel = require('../Models/guestModel')
var messageModel = require('../Models/messageModel')
var replyModel = require('../Models/replyModel')

function createdTime() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    return { "date": year + "-" + month + "-" + date, "time": hours + ":" + minutes }
}
router.post('/signUp', (req, res) => {

    guestModel.findOne({ email: req.body.email }, (err, guest) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else if (guest) {
            res.json({ "message": "user already have account!" })
        }
        else {
            const { name, birthday, email, phone, address, Zip, password } = req.body
            const newGuest = new guestModel({
                _id: mongoose.Types.ObjectId(),
                name,
                birthday,
                email,
                phone,
                address,
                Zip,
                password
            })
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    res.json({
                        "message": "error"
                    })
                }
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        res.json({ "message": "error" })
                    }
                    newGuest.password = hash;

                    newGuest.save((err) => {

                        if (err) {
                            res.json({ "message": "error" })
                        }
                        res.json({ "message": "success", data: newGuest })
                    });
                })
            }
            )
        }
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    guestModel.findOne({ email: email }).exec((err, guest) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else if (guest) {
            bcrypt.compare(password, guest.password, (err, validepassword) => {
                if (err) {
                    res.json({ "message": err })
                }
                else if (!validepassword) {
                    res.json({ "message": "invalid password!" })
                }
                else {
                    let payload = { subject: guest._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).json({ "message": "success", "token": token })
                }
            })
        }
    })
})

router.post('/AddMessage', verifyToken, (req, res) => {
    const { message } = req.body
    const author = req.userID
    const createdIn = createdTime()
    const newMessage = new messageModel({
        _id: mongoose.Types.ObjectId(),
        message,
        author,
        createdIn
    })
    newMessage.save((err, done) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            guestModel.findOne({ _id: author }).exec((err, guest) => {
                if (err) {
                    res.json({ "message": "error" })
                }
                else {
                    guest.messages.push(done._id)
                    guest.save((err) => {
                        if (err) {
                            res.json({ "message": "error" })
                        }
                        else {
                            res.status("200").json({ "message": "success", data: done })
                        }
                    })
                }
            })
        }
    })

})

router.get('/MyMessages', verifyToken, (req, res) => {
    const author = req.userID
    debugger
    messageModel.find({ author: author }).populate('author', 'name').exec((err, messages) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            res.json({ "message": "success", "messages": messages })
        }

    })
})

router.get('/AllMessages', (req, res) => {
    const currentUser = req.userID
    messageModel.find({}).populate('author', 'name').exec((err, data) => {
        if (err) {
            res.json({ "message": err })
        }
        else {

            res.json({ "message": "success", "data": data })
        }
    })

})

router.delete('/deleteMessage/:id', verifyToken, (req, res) => {
    messageModel.remove({ _id: req.params.id }, (err,) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            res.json({ "message": "success" })
        }
    })
})

router.post('/editeMessage', verifyToken, (req, res) => {
    const { message, messageID } = req.body
    messageModel.findOneAndUpdate({ _id: messageID }, { message: message }, (err, edited) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            res.json({ "message": "success" })
        }
    })

})

router.post('/AddReply', verifyToken, (req, res) => {
    const { reply, messageID } = req.body
    const authorID = req.userID
    const createdIn = createdTime()
    messageModel.findOne({ _id: messageID }).populate('author').exec((err, data) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            let FullReply = { 'reply': reply, 'authorName': data.author.name, "createdIn": createdIn }
            debugger
            data.replies.push(FullReply)
            data.save((err, done) => {
                if (err) {
                    res.json({ "message": "error" })
                }
                else {
                    res.json({ "message": "success", "data": FullReply })
                }
            })
        }
    })



})

router.get('/getMessage/:id', verifyToken, (req, res) => {
    messageModel.findOne({ _id: req.params.id }).populate('author', 'name').exec((err, data) => {
        if (err) {
            res.json({ "message": "error" })
        }
        else {
            res.json({ "message": "success", "data": data })
        }
    })
})

module.exports = router