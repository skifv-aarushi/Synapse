import { useState } from 'react';

function NoteCard({ note, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const saveNote = () => {
    onUpdate(note.id, title.trim() || 'Untitled', content.trim());
    setEditing(false);
  };

  return (
    <div className="note-card soft-card">
      <div className="note-header">
        <div>
          <h3>{editing ? 'Edit note' : note.title || 'Untitled'}</h3>
          <span className="meta-text">{new Date(note.created_at).toLocaleDateString()}</span>
        </div>
        <div className="note-actions">
          <button className="tiny-button" onClick={() => setEditing((value) => !value)}>
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button className="tiny-button red" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <div className="note-edit">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="4" />
          <button className="primary-button small" onClick={saveNote}>Save</button>
        </div>
      ) : (
        <p>{note.content || 'No content yet...'}</p>
      )}
    </div>
  );
}

export default NoteCard;
