import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() === '') return alert('Task cannot be empty!');
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'completed' ? task.completed :
    !task.completed
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1
  );

  return (
    <div className="todo-container">
      <h2>To-Do List</h2>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
<div className="task-actions">
  <button className="done-btn" onClick={() => toggleComplete(task.id)}>
    {task.completed ? 'Undo' : 'Done'}
  </button>
  <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
</div>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
