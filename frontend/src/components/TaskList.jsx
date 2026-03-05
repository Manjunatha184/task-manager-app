import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

export default function TaskList({ tasks, onUpdate, onDelete, isLoading, onRefresh }) {
  const [filterStatus, setFilterStatus] = useState(null);

  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>📋 Your Tasks</h2>
        <button
          className="btn btn-small btn-secondary"
          onClick={onRefresh}
          disabled={isLoading}
          title="Refresh task list"
        >
          {isLoading ? '⏳ Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      <div className="task-stats">
        <div className="stat">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.todo}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="task-filters">
        <button
          className={`filter-btn ${!filterStatus ? 'active' : ''}`}
          onClick={() => setFilterStatus(null)}
          aria-pressed={!filterStatus}
        >
          ✨ All
        </button>
        <button
          className={`filter-btn ${filterStatus === 'todo' ? 'active' : ''}`}
          onClick={() => setFilterStatus('todo')}
          aria-pressed={filterStatus === 'todo'}
        >
          ○ To Do
        </button>
        <button
          className={`filter-btn ${filterStatus === 'in_progress' ? 'active' : ''}`}
          onClick={() => setFilterStatus('in_progress')}
          aria-pressed={filterStatus === 'in_progress'}
        >
          ◐ In Progress
        </button>
        <button
          className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
          aria-pressed={filterStatus === 'completed'}
        >
          ✓ Completed
        </button>
      </div>

      <div className="tasks-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div key={task.id} style={{ '--task-index': index }}>
              <TaskItem
                task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            </div>
          ))
        ) : (
          <div className="no-tasks">
            <p>
              {tasks.length === 0
                ? '📝 No tasks yet. Create one to get started!'
                : `🔍 No tasks with status "${filterStatus.replace('_', ' ')}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
