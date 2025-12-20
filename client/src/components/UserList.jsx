const UserList = ({ users }) => {
  return (
    <div className="w-64 bg-gray-50 border-l p-4">
      <h3 className="text-lg font-semibold mb-4">
        Active Users ({users.length})
      </h3>
      
      <div className="space-y-2">
        {users.map((user, index) => (
          <div
            key={user.socketId || index}
            className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">{user.username}</span>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <p className="text-gray-500 text-sm">No users online</p>
      )}
    </div>
  )
}

export default UserList