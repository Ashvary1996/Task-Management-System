const db = require("../config/db");

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const query =
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";
    await db.query(query, [req.user.id, title, description]);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const query = "SELECT * FROM tasks WHERE user_id = ?";
    const [tasks] = await db.query(query, [req.user.id]);
    res.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res
      .status(400)
      .json({ message: "Title, description, and status are required" });
  }

  try {
    const query =
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";
    await db.query(query, [title, description, status, id, req.user.id]);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    await db.query(query, [id, req.user.id]);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
