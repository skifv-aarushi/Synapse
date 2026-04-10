import { useEffect, useRef, useState } from 'react';
import TaskList from '../components/TaskList';
import NoteList from '../components/NoteList';

const TASKS_STORAGE_KEY = 'synapseTasks';
const NOTES_STORAGE_KEY = 'synapseNotes';
const menuItems = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'notes', label: 'Notes' }
];

function Home() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const welcomeRef = useRef(null);
  const tasksRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    const savedTasks = sessionStorage.getItem(TASKS_STORAGE_KEY);
    const savedNotes = sessionStorage.getItem(NOTES_STORAGE_KEY);

    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);
  }, []);

  const saveState = (updatedTasks, updatedNotes) => {
    sessionStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
    sessionStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const scrollToSection = (section) => {
    const refs = {
      welcome: welcomeRef,
      tasks: tasksRef,
      notes: notesRef
    };

    refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      completed: false,
      created_at: new Date().toISOString()
    };

    setTasks((current) => {
      const updatedTasks = [newTask, ...current];
      saveState(updatedTasks, notes);
      return updatedTasks;
    });

    setTaskTitle('');
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      created_at: new Date().toISOString()
    };

    setNotes((current) => {
      const updatedNotes = [newNote, ...current];
      saveState(tasks, updatedNotes);
      return updatedNotes;
    });

    setNoteTitle('');
    setNoteContent('');
  };

  const handleToggleComplete = (id) => {
    setTasks((current) => {
      const updatedTasks = current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      saveState(updatedTasks, notes);
      return updatedTasks;
    });
  };

  const handleDeleteTask = (id) => {
    setTasks((current) => {
      const updatedTasks = current.filter((task) => task.id !== id);
      saveState(updatedTasks, notes);
      return updatedTasks;
    });
  };

  const handleDeleteNote = (id) => {
    setNotes((current) => {
      const updatedNotes = current.filter((note) => note.id !== id);
      saveState(tasks, updatedNotes);
      return updatedNotes;
    });
  };

  const handleUpdateNote = (id, title, content) => {
    setNotes((current) => {
      const updatedNotes = current.map((note) =>
        note.id === id ? { ...note, title, content } : note
      );
      saveState(tasks, updatedNotes);
      return updatedNotes;
    });
  };

  const filteredNotes = notes.filter((note) => {
    const text = `${note.title} ${note.content}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="page-shell pastel-bg">
      <main className="layout">
        <section ref={welcomeRef} id="welcome" className="hero-landing soft-card">
          <div className="hero-menu">
            <button
              className="primary-button dropdown-toggle"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Menu
            </button>
            <ul className={`dropdown-menu${menuOpen ? ' show' : ''}`}>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Session notes & to-dos</p>
            <h1>Synapse</h1>
            
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => scrollToSection('tasks')}>
                Start To-do list
              </button>
              <button className="secondary-button" type="button" onClick={() => scrollToSection('notes')}>
                Go to Notes
              </button>
            </div>
          </div>
        </section>

        <section ref={tasksRef} id="tasks" className="panel soft-card">
          <div className="panel-header">
            <h2>To-do list</h2>
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
        </section>

        <section ref={notesRef} id="notes" className="panel soft-card">
          <div className="panel-header">
            <h2>Notes</h2>
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
        </section>
      </main>
    </div>
  );
}

export default Home;
