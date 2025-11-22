import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Create a task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, subtasks } = req.body;
    const task = new Task({ title, description, status, priority, dueDate, subtasks });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, subtasks } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate, subtasks },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task" });
  }
};

// Toggle completion status
export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to toggle task" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete task" });
  }
};