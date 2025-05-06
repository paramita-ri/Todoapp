import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('medium')

  // No need for useEffect to fetch from backend
  // useEffect(() => {
  //   fetchTodos()
  // }, [])

  const addTodo = () => {
    if (!task.trim()) return

    const newTodo = {
      _id: Date.now().toString(), // Generate a simple ID
      task,
      status,
      createdAt: new Date().toISOString()
    }

    setTodos([newTodo, ...todos])
    setTask('')
  }

  const updateTodo = (id, newStatus) => {
    setTodos(todos.map(todo => 
      todo._id === id ? {...todo, status: newStatus} : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo._id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'red'
      case 'medium': return 'orange'
      case 'low': return 'green'
      default: return 'gray'
    }
  }

  return (
    <div className="app">
      <h1>Todo List (Frontend Only)</h1>
      <div className="add-todo">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className="todo-item">
              <span>{todo.task}</span>
              <div className="todo-actions">
                <select
                  value={todo.status}
                  onChange={(e) => updateTodo(todo._id, e.target.value)}
                  className={`priority-${todo.status}`}
                  style={{ color: getStatusColor(todo.status) }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App