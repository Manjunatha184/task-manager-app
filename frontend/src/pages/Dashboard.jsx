import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { tasksAPI } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load user info and tasks on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    loadTasks();
  }, [navigate]);

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data.tasks);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setLoading(true);
    setError('');

    try {
      const response = await tasksAPI.createTask(
        taskData.title,
        taskData.description
      );
      setTasks([response.data, ...tasks]);
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to create task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setLoading(true);
    setError('');

    try {
      const response = await tasksAPI.updateTask(taskId, updates);
      setTasks(
        tasks.map((task) => (task.id === taskId ? response.data : task))
      );
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to update task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setLoading(true);
    setError('');

    try {
      await tasksAPI.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to delete task';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Calculate statistics
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  if (!user) {
    return null; // Redirect is happening in useEffect
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>✨ Task Manager</h1>
            <p className="user-email">Welcome, {user.email} 👋</p>
          </div>
          <button className="btn btn-logout" onClick={handleLogout} title="Sign out">
            🚪 Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {error && <div className="error-banner">{error}</div>}

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">To Do</div>
            <div className="stat-value">{stats.todo}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">In Progress</div>
            <div className="stat-value">{stats.inProgress}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value">{stats.completed}</div>
          </div>
        </div>

        <TaskForm onSubmit={handleCreateTask} isLoading={loading} />

        <TaskList
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          isLoading={loading}
          onRefresh={loadTasks}
        />
      </main>
    </div>
  );
}
