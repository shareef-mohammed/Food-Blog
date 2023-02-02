const ChatModel = require("../models/chatModel");
const userData =  require('../models/userModel');

exports.createChat = async(req, res) => {
    const newChat = new ChatModel ({
        members: [req.body.senderId, req.body.receiverId]
    });
    const exist = await ChatModel.findOne({
        members: { $all: [ req.body.senderId, req.body.receiverId ] }
     })
     
    try {
        if(exist) {
            return res.status(200).json({status:'ok'}); 
        }
        const result = await newChat.save();
        res.status(200).json({status:'ok'});
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.findChat = async(req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getUser = async(req, res) => {
    try {
        const {id} = req.params
        const receiver = await userData.findById(id)
        res.status(200).json(receiver)
    } catch (error) {
        res.status(500).json(error)
    }
}