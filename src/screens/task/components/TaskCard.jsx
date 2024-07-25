import { taskService } from "../../../api/taskService";

const TaskCard = ({ task, openEditTaskModal, handleDelete }) => {
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      handleDelete(task.id);
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded shadow-md max-w-sm mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>
      <p className="text-xs text-gray-500 mt-2">{task.createdAt}</p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => openEditTaskModal(task)}
        >
          Edit
        </button>
        <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
