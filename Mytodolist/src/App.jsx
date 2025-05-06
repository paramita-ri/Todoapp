import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState('')
  const [status, setStatus] = useState('medium')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      const data = await response.json()
      setTodos(data)
    } catch (err) {
      console.error('Error fetching todos:', err)
    }
  }

  const addTodo = async () => {
    if (!task.trim()) return

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, status }),
      })
      const newTodo = await response.json()
      setTodos([newTodo, ...todos])
      setTask('')
    } catch (err) {
      console.error('Error adding todo:', err)
    }
  }

  const updateTodo = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      ))
    } catch (err) {
      console.error('Error updating todo:', err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
    }
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
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo._id} className="todo-item">
            <span>{todo.task}</span>
            <div className="todo-actions">
              <select
                value={todo.status}
                onChange={(e) => updateTodo(todo._id, e.target.value)}
                className={`priority-${todo.status}`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App