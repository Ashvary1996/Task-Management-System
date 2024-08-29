import React, { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskStore")) || []
  );

  useEffect(() => {
    localStorage.setItem("taskStore", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const newTaskName = prompt("Edit Task Name:", task.taskName);
    const newTaskDescription = prompt(
      "Edit Task Description:",
      task.taskDescription
    );

    if (newTaskName && newTaskDescription) {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              taskName: newTaskName,
              taskDescription: newTaskDescription,
            }
          : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
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
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-lg font-semibold">{index + 1}</span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  className="h-5 w-5 rounded focus:ring-teal-500"
                />
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.taskName}
                  </h3>
                  <p
                    className={`text-sm ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.taskDescription}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(task.id)}
                  disabled={task.completed}
                  className={`px-3 py-1 rounded ${
                    task.completed
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
