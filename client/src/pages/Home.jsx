import React, { useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";

function Home() {
  const [showTask, setShowTask] = useState(true);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition duration-300"
            onClick={() => setShowTask(!showTask)}
          >
            {showTask ? "Add New Task" : "Show Tasks"}
          </button>
        </div>
        {showTask ? <Tasks /> : <AddTask />}
      </div>
    </div>
  );
}

export default Home;
