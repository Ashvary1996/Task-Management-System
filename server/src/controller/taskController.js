const db = require("../config/db");
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regex)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const status = "pending";

  if (!title || !description || !dueDate) {
    return res
      .status(400)
      .json({ message: "Title, description, and due date are required" });
  }

  if (!isValidDate(dueDate)) {
    return res.status(400).json({ message: "Invalid due date format" });
  }

  try {
    const query =
      "INSERT INTO tasks (user_id, title, description, dueDate, status) VALUES (?, ?, ?, ?, ?)";
    await db.query(query, [req.user.id, title, description, dueDate, status]);
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
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({
      message: "Title, description, status, and due date are required",
    });
  }

  if (!isValidDate(dueDate)) {
    return res.status(400).json({ message: "Invalid due date format" });
  }

  try {
    const query =
      "UPDATE tasks SET title = ?, description = ?, status = ?, dueDate = ? WHERE id = ? AND user_id = ?";
    await db.query(query, [
      title,
      description,
      status,
      dueDate,
      id,
      req.user.id,
    ]);
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
