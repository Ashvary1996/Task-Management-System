import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskName && taskDescription && dueDate) {
      try {
        const formattedDueDate = new Date(dueDate).toISOString().split("T")[0];

        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/tasks`,
          {
            title: taskName,
            description: taskDescription,
            dueDate: formattedDueDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTaskName("");
        setTaskDescription("");
        setDueDate("");

        toast.success("Task added successfully!", {
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error adding task:", error);
        toast.error("Failed to add task. Please try again.", {
          autoClose: 5000,
        });
      }
    } else {
      toast.warn("Please fill in all fields.", {
        autoClose: 4000,
      });
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
      <ToastContainer />
    </div>
  );
};

export default AddTask;
