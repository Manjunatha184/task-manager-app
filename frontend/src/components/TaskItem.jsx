import React, { useState } from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onUpdate, onDelete, isLoading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [error, setError] = useState('');

  const handleStatusChange = async (newStatus) => {
    try {
      await onUpdate(task.id, { status: newStatus });
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  const handleSaveEdit = async () => {
    if (!editedTitle.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      await onUpdate(task.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
      });
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      try {
        await onDelete(task.id);
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'todo':
        return '○';
      case 'in_progress':
        return '◐';
      case 'completed':
        return '✓';
      default:
        return '●';
    }
  };

  return (
    <div className={`task-item status-${task.status}`}>
      {error && <div className="error-message small">{error}</div>}
      
      {isEditing ? (
        <div className="task-edit-mode">
          <div className="form-group">
            <label htmlFor={`title-${task.id}`}>Task Title</label>
            <input
              id={`title-${task.id}`}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Task title"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`desc-${task.id}`}>Description</label>
            <textarea
              id={`desc-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Task description"
              disabled={isLoading}
              rows="2"
            />
          </div>
          <div className="task-edit-actions">
            <button
              className="btn btn-small btn-success"
              onClick={handleSaveEdit}
              disabled={isLoading}
            >
              ✓ Save
            </button>
            <button
              className="btn btn-small btn-secondary"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <div className="task-title-group">
              <h4 className="task-title">{task.title}</h4>
            </div>
            <span className={`task-status ${task.status}`}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-meta">
            <span className="task-date">📅 {formatDate(task.created_at)}</span>
          </div>
          
          <div className="task-actions">
            <div className="status-buttons">
              {['todo', 'in_progress', 'completed'].map((status) => (
                <button
                  key={status}
                  className={`status-btn ${task.status === status ? 'active' : ''}`}
                  onClick={() => handleStatusChange(status)}
                  disabled={isLoading}
                  title={`Mark as ${status.replace('_', ' ')}`}
                  aria-label={`Mark task as ${status.replace('_', ' ')}`}
                >
                  {getStatusEmoji(status)}
                </button>
              ))}
            </div>
            
            <div className="action-buttons">
              <button
                className="btn btn-small btn-edit"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                title="Edit task"
                aria-label="Edit task"
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-small btn-danger"
                onClick={handleDelete}
                disabled={isLoading}
                title="Delete task"
                aria-label="Delete task"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
