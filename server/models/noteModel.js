import { getDb } from '../db/database.js';

export async function fetchNotes() {
  const db = getDb();
  return db.all('SELECT * FROM notes ORDER BY created_at DESC');
}

export async function insertNote({ title, content, task_id }) {
  const db = getDb();
  const result = await db.run(
    'INSERT INTO notes (title, content, task_id) VALUES (?, ?, ?)',
    title || '',
    content || '',
    task_id || null
  );
  return db.get('SELECT * FROM notes WHERE id = ?', result.lastID);
}

export async function updateNote(id, data) {
  const db = getDb();
  const updates = [];
  const params = [];

  if (data.title !== undefined) {
    updates.push('title = ?');
    params.push(data.title);
  }
  if (data.content !== undefined) {
    updates.push('content = ?');
    params.push(data.content);
  }
  if (data.task_id !== undefined) {
    updates.push('task_id = ?');
    params.push(data.task_id);
  }

  params.push(id);
  await db.run(`UPDATE notes SET ${updates.join(', ')} WHERE id = ?`, params);
  return db.get('SELECT * FROM notes WHERE id = ?', id);
}

export async function removeNote(id) {
  const db = getDb();
  return db.run('DELETE FROM notes WHERE id = ?', id);
}
