import * as taskModel from '../models/taskModel.js';

export async function getTasks(req, res) {
  const tasks = await taskModel.fetchTasks();
  res.json(tasks);
}

export async function createTask(req, res) {
  const { title } = req.body;
  const task = await taskModel.insertTask(title || 'New task');
  res.status(201).json(task);
}

export async function updateTask(req, res) {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await taskModel.updateTask(id, { title, completed });
  res.json(task);
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  await taskModel.removeTask(id);
  res.status(204).end();
}
