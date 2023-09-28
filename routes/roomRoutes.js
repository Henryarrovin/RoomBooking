const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Create a new room
router.post('/', roomController.createRoom);

// Get a list of all rooms
router.get('/', roomController.getAllRooms);

// Get room by ID
router.get('/:roomId', roomController.getRoomById);

// Update a room by ID
router.put('/:roomId', roomController.updateRoomById);

// Delete a room by ID
router.delete('/:roomId', roomController.deleteRoomById);

module.exports = router;
