const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  users: [{
    socketId: String,
    username: String,
    joinedAt: { type: Date, default: Date.now }
  }],
  drawingData: [{
    type: {
      type: String,
      enum: ['draw', 'erase', 'clear'],
      required: true
    },
    x: Number,
    y: Number,
    prevX: Number,
    prevY: Number,
    color: String,
    lineWidth: Number,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);