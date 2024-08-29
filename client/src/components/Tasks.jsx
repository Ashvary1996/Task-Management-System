import React, { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const newTaskName = prompt("Edit Task Name:", task.title);
    const newTaskDescription = prompt(
      "Edit Task Description:",
      task.description
    );
    const newDueDate = prompt("Edit Due Date (YYYY-MM-DD):", task.dueDate);

    if (newTaskName && newTaskDescription && newDueDate) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${id}`,
          {
            title: newTaskName,
            description: newTaskDescription,
            dueDate: newDueDate,
            status: task.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const updatedTasks = tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                title: newTaskName,
                description: newTaskDescription,
                dueDate: newDueDate,
              }
            : task
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const newStatus = task.status === "completed" ? "pending" : "completed";

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Your Tasks
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`p-4 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between ${
                task.status === "completed" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-lg font-semibold">{index + 1}</span>
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleToggleComplete(task.id)}
                  className="h-5 w-5 rounded focus:ring-teal-500"
                />
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold ${
                      task.status === "completed" ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      task.status === "completed"
                        ? "line-through text-gray-500"
                        : ""
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(task.id)}
                  disabled={task.status === "completed"}
                  className={`px-3 py-1 rounded ${
                    task.status === "completed"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
