import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { taskService } from '../../../api/taskService';
import TaskCard from './TaskCard';
import { toast } from 'react-toastify';

const columns = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const TaskManager = ({ openEditTaskModal, handleSaveTask }) => {
  const [tasks, setTasks] = useState({
    TODO: [],
    IN_PROGRESS: [],
    DONE: []
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Fetch tasks when component mounts or when handleSaveTask changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getAllTask();
        const data = response.data;
        const organizedTasks = {
          TODO: [],
          IN_PROGRESS: [],
          DONE: []
        };

        data.forEach(task => {
          if (organizedTasks[task.status]) {
            organizedTasks[task.status].push(task);
          }
        });

        setTasks(organizedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [handleSaveTask]); // Dependency array

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted Successfully!')
      setTasks(prevTasks => {
        const updatedTasks = {
          TODO: prevTasks.TODO.filter(task => task._id !== taskId),
          IN_PROGRESS: prevTasks.IN_PROGRESS.filter(task => task._id !== taskId),
          DONE: prevTasks.DONE.filter(task => task._id !== taskId)
        };
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle drag end
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;
    const taskId = result.draggableId;

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(tasks[sourceColumn]);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      setTasks(prev => ({
        ...prev,
        [sourceColumn]: newTasks,
      }));
    } else {
      const sourceTasks = Array.from(tasks[sourceColumn]);
      const destTasks = Array.from(tasks[destColumn]);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.status = destColumn;
      destTasks.splice(destination.index, 0, movedTask);

      setTasks(prev => ({
        ...prev,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      }));

      try {
        await taskService.updateTask(taskId, { status: destColumn });
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    }
  };

  // Filter tasks based on search input
  const filteredTasks = (tasks, searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = {};

    Object.keys(tasks).forEach(column => {
      filtered[column] = tasks[column].filter(task =>
        task.title.toLowerCase().includes(lowercasedSearchTerm) ||
        task.description.toLowerCase().includes(lowercasedSearchTerm)
      );
    });

    return filtered;
  };

  return (
    <div>
      <div>
        <span>Search:</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-1 border rounded w-80 ml-2"
        />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 flex-wrap">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 w-80 bg-gray-100 rounded-lg shadow-md"
                >
                  <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
                  {filteredTasks(tasks, searchTerm)[column.id]?.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            handleDelete={() => handleDelete(task._id)}
                            task={task}
                            openEditTaskModal={openEditTaskModal}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskManager;
