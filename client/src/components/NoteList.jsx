import NoteCard from './NoteCard';

function NoteList({ notes, onDelete, onUpdate }) {
  if (!notes.length) {
    return <div className="empty-state">No notes yet 📝</div>;
  }

  return (
    <div className="note-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default NoteList;
