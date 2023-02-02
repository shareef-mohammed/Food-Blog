const MessageData = require('../models/messageModel')

exports.addMessage = async(req, res) => {
    const {chatId, senderId, text} = req.body
    const message = new MessageData({
        chatId,
        senderId,
        text
    });
    try {
        const result = await message.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getMessages = async(req, res) => {
    const {chatId} = req.params

    try {
        const result = await MessageData.find({chatId})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}