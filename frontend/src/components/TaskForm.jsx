import React, { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
      });
      
      // Clear form
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  return (
    <div className="task-form-container">
      <h3>✨ Create New Task</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            maxLength="255"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add task description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            maxLength="1000"
            rows="3"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Creating...' : '➕ Create Task'}
        </button>
      </form>
    </div>
  );
}
