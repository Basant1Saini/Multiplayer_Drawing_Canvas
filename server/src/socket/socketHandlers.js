const Room = require('../models/Room');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', async (data) => {
      const { roomId, username } = data;
      
      try {
        let room = await Room.findOne({ roomId });
        
        if (!room) {
          room = new Room({
            roomId,
            name: `Room ${roomId}`,
            users: []
          });
        }

        // Add user to room
        room.users.push({
          socketId: socket.id,
          username
        });
        
        await room.save();
        
        socket.join(roomId);
        socket.roomId = roomId;
        socket.username = username;

        // Send existing drawing data to new user
        socket.emit('drawing-data', room.drawingData);
        
        // Notify others about new user
        socket.to(roomId).emit('user-joined', {
          username,
          users: room.users
        });

        socket.emit('room-joined', {
          roomId,
          users: room.users
        });

      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', 'Failed to join room');
      }
    });

    socket.on('drawing', async (data) => {
      if (!socket.roomId) return;

      try {
        const room = await Room.findOne({ roomId: socket.roomId });
        if (room) {
          room.drawingData.push(data);
          await room.save();
        }

        socket.to(socket.roomId).emit('drawing', data);
      } catch (error) {
        console.error('Error saving drawing data:', error);
      }
    });

    socket.on('clear-canvas', async () => {
      if (!socket.roomId) return;

      try {
        await Room.updateOne(
          { roomId: socket.roomId },
          { $set: { drawingData: [] } }
        );

        socket.to(socket.roomId).emit('clear-canvas');
      } catch (error) {
        console.error('Error clearing canvas:', error);
      }
    });

    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);
      
      if (socket.roomId) {
        try {
          const room = await Room.findOne({ roomId: socket.roomId });
          if (room) {
            room.users = room.users.filter(user => user.socketId !== socket.id);
            await room.save();

            socket.to(socket.roomId).emit('user-left', {
              username: socket.username,
              users: room.users
            });
          }
        } catch (error) {
          console.error('Error handling disconnect:', error);
        }
      }
    });
  });
};