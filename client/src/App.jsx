import { useState } from 'react'
import JoinRoom from './components/JoinRoom'
import DrawingCanvas from './components/DrawingCanvas'
import { useSocket } from './hooks/useSocket'

function App() {
  const [currentRoom, setCurrentRoom] = useState(null)
  const [username, setUsername] = useState('')
  const socket = useSocket()

  const handleJoinRoom = (roomData) => {
    setCurrentRoom(roomData.roomId)
    setUsername(roomData.username)
  }

  const handleLeaveRoom = () => {
    setCurrentRoom(null)
    setUsername('')
    if (socket) {
      socket.disconnect()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {!currentRoom ? (
        <JoinRoom onJoinRoom={handleJoinRoom} />
      ) : (
        <DrawingCanvas 
          roomId={currentRoom}
          username={username}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </div>
  )
}

export default App