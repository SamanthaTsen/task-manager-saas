export default function TaskForm({ newTask, setNewTask, createTask, category, setCategory }) {
  return (
    <div className="flex gap-2 mb-4">
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border rounded w-40"
      >
      <option value="work">Work</option>
      <option value="personal">Personal</option>
      <option value="study">Study</option>
      <option value="other">Other</option>
      </select>

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
  );
}
