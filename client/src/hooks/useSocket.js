import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    const newSocket = io(serverUrl)
    
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return socket
}