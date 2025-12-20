const Toolbar = ({ 
  currentTool, 
  setCurrentTool, 
  currentColor, 
  setCurrentColor, 
  lineWidth, 
  setLineWidth, 
  onClear 
}) => {
  const tools = [
    { id: 'pen', name: 'Pen', icon: '✏️' },
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' }
  ]

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
    '#800080', '#FFC0CB', '#A52A2A', '#808080'
  ]

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex flex-col gap-4">
        {/* Tools */}
        <div>
          <h3 className="text-sm font-medium mb-2">Tools</h3>
          <div className="flex gap-2">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setCurrentTool(tool.id)}
                className={`p-2 rounded text-lg hover:bg-gray-100 ${
                  currentTool === tool.id ? 'bg-blue-100 border-2 border-blue-500' : 'border-2 border-transparent'
                }`}
                title={tool.name}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-sm font-medium mb-2">Colors</h3>
          <div className="grid grid-cols-4 gap-1">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`w-8 h-8 rounded border-2 ${
                  currentColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="w-full mt-2 h-8 rounded border"
          />
        </div>

        {/* Line Width */}
        <div>
          <h3 className="text-sm font-medium mb-2">Size: {lineWidth}px</h3>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Canvas
        </button>
      </div>
    </div>
  )
}

export default Toolbar