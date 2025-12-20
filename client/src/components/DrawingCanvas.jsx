import { useEffect, useRef, useState } from 'react'
import { useSocket } from '../hooks/useSocket'
import Toolbar from './Toolbar'
import UserList from './UserList'

const DrawingCanvas = ({ roomId, username, onLeaveRoom }) => {
  const canvasRef = useRef(null)
  const socket = useSocket()
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState('pen')
  const [currentColor, setCurrentColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(2)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!socket) return

    socket.emit('join-room', { roomId, username })

    socket.on('room-joined', (data) => {
      setUsers(data.users)
    })

    socket.on('user-joined', (data) => {
      setUsers(data.users)
    })

    socket.on('user-left', (data) => {
      setUsers(data.users)
    })

    socket.on('drawing-data', (drawingData) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      drawingData.forEach(data => {
        drawOnCanvas(ctx, data)
      })
    })

    socket.on('drawing', (data) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      drawOnCanvas(ctx, data)
    })

    socket.on('clear-canvas', () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    })

    return () => {
      socket.off('room-joined')
      socket.off('user-joined')
      socket.off('user-left')
      socket.off('drawing-data')
      socket.off('drawing')
      socket.off('clear-canvas')
    }
  }, [socket, roomId, username])

  useEffect(() => {
    const canvas = canvasRef.current
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const drawOnCanvas = (ctx, data) => {
    ctx.globalCompositeOperation = data.type === 'erase' ? 'destination-out' : 'source-over'
    ctx.strokeStyle = data.color || '#000000'
    ctx.lineWidth = data.lineWidth || 2
    ctx.lineCap = 'round'
    
    ctx.beginPath()
    ctx.moveTo(data.prevX, data.prevY)
    ctx.lineTo(data.x, data.y)
    ctx.stroke()
  }

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over'
    ctx.strokeStyle = currentColor
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round'
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    const prevX = e.clientX - rect.left - e.movementX
    const prevY = e.clientY - rect.top - e.movementY
    
    ctx.lineTo(x, y)
    ctx.stroke()
    
    // Emit drawing data to other users
    if (socket) {
      socket.emit('drawing', {
        type: currentTool === 'eraser' ? 'erase' : 'draw',
        x,
        y,
        prevX,
        prevY,
        color: currentColor,
        lineWidth
      })
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    if (socket) {
      socket.emit('clear-canvas')
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Room: {roomId}</h1>
          <span className="text-gray-600">Welcome, {username}!</span>
        </div>
        <button
          onClick={onLeaveRoom}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Leave Room
        </button>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 relative">
          <Toolbar
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
            onClear={clearCanvas}
          />
          
          <canvas
            ref={canvasRef}
            className="w-full h-full bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
        
        <UserList users={users} />
      </div>
    </div>
  )
}

export default DrawingCanvas