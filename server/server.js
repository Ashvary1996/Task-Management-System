const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const db = require("./src/config/db");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

db.getConnection()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.error("MySQL connection error:", err));

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("SIGINT", async () => {
  await db.end();
  console.log("MySQL connection closed");
  process.exit(0);
});
