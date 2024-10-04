const express = require('express');
const router = express.Router();
const roomController = require('../controllers/controller.js');

router.get('/', roomController.renderHome);

router.get('/getRoom', roomController.createRoom);

router.get('/:room', roomController.renderRoom);

module.exports = router;
