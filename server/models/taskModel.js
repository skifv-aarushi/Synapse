import { getDb } from '../db/database.js';

export async function fetchTasks() {
  const db = getDb();
  return db.all('SELECT * FROM tasks ORDER BY created_at DESC');
}

export async function insertTask(title) {
  const db = getDb();
  const result = await db.run(
    'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    title,
    0
  );
  return db.get('SELECT * FROM tasks WHERE id = ?', result.lastID);
}

export async function updateTask(id, data) {
  const db = getDb();
  const updates = [];
  const params = [];

  if (data.title !== undefined) {
    updates.push('title = ?');
    params.push(data.title);
  }
  if (data.completed !== undefined) {
    updates.push('completed = ?');
    params.push(data.completed ? 1 : 0);
  }

  params.push(id);
  await db.run(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, params);
  return db.get('SELECT * FROM tasks WHERE id = ?', id);
}

export async function removeTask(id) {
  const db = getDb();
  return db.run('DELETE FROM tasks WHERE id = ?', id);
}
