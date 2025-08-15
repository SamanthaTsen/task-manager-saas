import { useEffect, useState } from 'react';
import API from '../api';
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
      setMessage('');
    } catch (err) {
      setMessage(' Failed to obtain the task ');
      setError(true);
    }
  };

  const createTask = async () => {
    try {
      await API.post('/tasks', { title: newTask });
      setNewTask('');
      setMessage(' Task added successfully');
      setError(false);
      fetchTasks();
    } catch (err) {
      setMessage(' Task added failed');
      setError(true);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      setMessage(' Task status updated');
      setError(false);
      fetchTasks();
    } catch (err) {
      setMessage(' Update task failed');
      setError(true);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setMessage(' Task deleted');
      setError(false);
      fetchTasks();
    } catch (err) {
      setMessage('Failed to delete task');
      setError(true);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Create Task"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {message && (
        <p className={`mb-4 text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span
              className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTask(task._id, task.completed)}
                className="text-sm bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
              >
                Switch Complete
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
    </div>
  );
}
