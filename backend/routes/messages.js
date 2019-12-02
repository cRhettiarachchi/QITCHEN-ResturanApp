const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messages');

router.post('', messageController.creteMessage);

router.get('', messageController.readMessages);

router.delete('/:id', messageController.deleteMessage);

module.exports = router;
