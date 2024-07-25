import { useState } from "react";
import Navbar from "../../shared/components/Navbar"
import TaskManager from "./components/TaskManager"
import TaskModal from "./components/TaskModal";
import { taskService } from "../../api/taskService";
import { toast } from "react-toastify";

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openCreateTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };
  

  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveTask = async (taskData) => {
    if (selectedTask) {
      const response = await taskService.updateTask(taskData._id, {...taskData});
      toast.success('Task created Successfully!')
      console.log('Updating task:', response);
      closeModal();
      return response;
    } else {
      const response = await taskService.createTask(taskData);
      console.log(response);
      closeModal();
      return response;
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="flex justify-start mt-4 mx-8">
        <button className="bg-blue-500 py-2 px-12 rounded-md text-white" onClick={openCreateTaskModal}>
          Add Task
        </button>
      </div>
      <div className="flex max-w-5xl mx-auto mt-4">
        <TaskManager openEditTaskModal={openEditTaskModal} handleSaveTask={handleSaveTask}/>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </div>
  )
}

export default Task
