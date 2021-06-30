const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

const {
  newConversation,
  newMessage,
  getConversations,
  deleteConversation,
  readMessages,
  getConversation,
} = require('../controllers/message');

router.route('/conversation/create/:id').post(protect, newConversation);

router.route('/:id').post(protect, newMessage);

router.route('/conversation/all').get(protect, getConversations);

router.route('/conversation/delete').delete(protect, deleteConversation);

router.route('/:id').patch(protect, readMessages);

router.route('/conversation/show/:id').get(protect, getConversation);

module.exports = router;
