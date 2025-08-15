export default function TaskList({ tasks, toggleTask, deleteTask, handleEdit }) {
  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <li key={task._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
            <div>{task.title}</div>
            <span className="text-xs text-gray-500">
              {task.category} • {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => toggleTask(task._id, task.completed)}
              className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
            >
              Switch Complete
            </button>
            <button
              onClick={() => handleEdit(task)}
              className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
