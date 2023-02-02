const express = require("express");
const { createChat, findChat, userChats, getUser } = require("../controllers/chatController");

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)
router.get('/getUser/:id', getUser)

module.exports = router