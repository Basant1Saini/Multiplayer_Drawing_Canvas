const Room = require('../models/Room');

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}, 'roomId name users createdAt')
      .sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomId, name } = req.body;
    
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room already exists' });
    }

    const room = new Room({
      roomId,
      name: name || `Room ${roomId}`,
      users: [],
      drawingData: []
    });

    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

const getRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findOne({ roomId });
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoom
};