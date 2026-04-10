import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import NoteList from '../components/NoteList';

const API_BASE = 'http://localhost:5000';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchNotes();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${API_BASE}/tasks`);
    const data = await response.json();
    setTasks(data);
  };

  const fetchNotes = async () => {
    const response = await fetch(`${API_BASE}/notes`);
    const data = await response.json();
    setNotes(data);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!taskTitle.trim()) return;
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle.trim() })
    });
    const newTask = await response.json();
    setTasks((current) => [newTask, ...current]);
    setTaskTitle('');
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) return;
    const response = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: noteTitle.trim(), content: noteContent.trim() })
    });
    const newNote = await response.json();
    setNotes((current) => [newNote, ...current]);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleToggleComplete = async (id, completed) => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    const updatedTask = await response.json();
    setTasks((current) => current.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = async (id) => {
    await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const handleDeleteNote = async (id) => {
    await fetch(`${API_BASE}/notes/${id}`, { method: 'DELETE' });
    setNotes((current) => current.filter((note) => note.id !== id));
  };

  const handleUpdateNote = async (id, title, content) => {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    const updatedNote = await response.json();
    setNotes((current) => current.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="page-shell pastel-bg">
      <main className="layout">
        <section className="hero-card soft-card">
          <div>
            <h1>Synapse 🌸</h1>
          </div>
        </section>

        <section className="panel-row">
          <article className="panel soft-card">
            <div className="panel-header">
              <h2>Task Garden</h2>
              <span>📝</span>
            </div>
            <form className="input-row" onSubmit={handleAddTask}>
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Add a new task..."
              />
              <button type="submit" className="primary-button">Add</button>
            </form>
            <TaskList tasks={tasks} onToggle={handleToggleComplete} onDelete={handleDeleteTask} />
          </article>

          <article className="panel soft-card">
            <div className="panel-header">
              <h2>Notes Blossom</h2>
              <span>✨</span>
            </div>
            <form className="input-column" onSubmit={handleAddNote}>
              <input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title"
              />
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note..."
                rows="4"
              />
              <button type="submit" className="secondary-button">Save note</button>
            </form>
            <div className="search-bar">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notes..."
              />
            </div>
            <NoteList notes={filteredNotes} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
          </article>
        </section>
      </main>
    </div>
  );
}

export default Home;
