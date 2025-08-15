export default function EditTaskForm({ editedTitle, setEditedTitle, editedCategory, setEditedCategory, saveEdit, cancelEdit }) {
  return (
    <div className="mb-4">
      <select
        value={editedCategory}
        onChange={e => setEditedCategory(e.target.value)}
        className="p-2 border rounded w-full mt-2"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
        <option value="other">Other</option>
      </select>
      
      <input
        value={editedTitle}
        onChange={e => setEditedTitle(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={saveEdit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
