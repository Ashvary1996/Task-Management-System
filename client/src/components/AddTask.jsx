import React, { useState } from "react";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const taskStorage = JSON.parse(localStorage.getItem("taskStore")) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskDescription) {
      const newTask = { id: Date.now(), taskName, taskDescription };
      taskStorage.push(newTask);
      localStorage.setItem("taskStore", JSON.stringify(taskStorage));

      // setTaskName("");
      // setTaskDescription("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Task Name
          </label>
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Task Description
          </label>
          <textarea
            placeholder="Enter task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition duration-300"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
