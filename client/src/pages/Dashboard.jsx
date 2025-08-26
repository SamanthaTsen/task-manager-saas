import { useEffect, useState } from 'react';
import API from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import EditTaskForm from '../components/EditTaskForm';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('other');
  const [editedCategory, setEditedCategory] = useState('other');

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
      setMessage('');
    } catch {
      setMessage('Failed to obtain the task');
      setError(true);
    }
  };

  const createTask = async () => {
    try {
      await API.post('/tasks', { title: newTask, category });
      setNewTask('');
      setMessage('Task added successfully');
      setError(false);
      fetchTasks();
    } catch {
      setMessage('Task added failed');
      setError(true);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      setMessage('Task status updated');
      setError(false);
      fetchTasks();
    } catch {
      setMessage('Update task failed');
      setError(true);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setMessage('Task deleted');
      setError(false);
      fetchTasks();
    } catch {
      setMessage('Failed to delete task');
      setError(true);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedCategory(task.category);
  };

  const saveEdit = async () => {
    try {
      await API.put(`/tasks/${editingTask._id}`, { title: editedTitle, category: editedCategory });
      setEditingTask(null);
      setEditedTitle('');
      setMessage('Task updated successfully');
      setError(false);
      fetchTasks();
    } catch {
      setMessage('Failed to update task');
      setError(true);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
  };

  const handleViewStats = () => {
    navigate('/stats');
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      
      <div className="space-x-2">
        <button
           onClick={handleViewStats}
           className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Stats
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        category={category}
        setCategory={setCategory}
        createTask={createTask}
      />

      {editingTask && (
        <EditTaskForm
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          editedCategory={editedCategory}
          setEditedCategory={setEditedCategory}
          saveEdit={saveEdit}
          cancelEdit={() => setEditingTask(null)}
        />
      )}

      {message && (
        <p className={`mb-4 text-sm ${error ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        handleEdit={handleEdit}
      />
    </div>
  );
}
