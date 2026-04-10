import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return <div className="empty-state">No tasks yet 🌸</div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
