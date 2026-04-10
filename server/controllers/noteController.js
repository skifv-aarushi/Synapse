import * as noteModel from '../models/noteModel.js';

export async function getNotes(req, res) {
  const notes = await noteModel.fetchNotes();
  res.json(notes);
}

export async function createNote(req, res) {
  const { title, content, task_id } = req.body;
  const note = await noteModel.insertNote({ title, content, task_id });
  res.status(201).json(note);
}

export async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, task_id } = req.body;
  const note = await noteModel.updateNote(id, { title, content, task_id });
  res.json(note);
}

export async function deleteNote(req, res) {
  const { id } = req.params;
  await noteModel.removeNote(id);
  res.status(204).end();
}
