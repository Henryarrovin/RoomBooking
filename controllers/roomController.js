const Room = require('../models/Room');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const room = new Room({ name, description });
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a list of all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a room by ID
exports.updateRoomById = async (req, res) => {
  try {
    const { name, description } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      { name, description },
      { new: true }
    );
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error updating room by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a room by ID
exports.deleteRoomById = async (req, res) => {
  try {
    const room = await Room.findByIdAndRemove(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
