function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
        />
        <span>{task.title}</span>
      </label>
      <button className="icon-button" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
