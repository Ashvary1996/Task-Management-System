module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM("pending", "completed"),
      defaultValue: "pending",
    },
    dueDate: {
      type: Sequelize.DATE,
    },
  });

  return Task;
};
