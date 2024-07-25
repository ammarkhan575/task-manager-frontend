import TaskForm from './TaskForm';

const TaskModal = ({ isOpen, onClose, task, onSave }) => {
  const isEditMode = !!task;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Task' : 'Create Task'}</h2>
        <TaskForm onSubmit={onSave} defaultValues={task || {}} />
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
