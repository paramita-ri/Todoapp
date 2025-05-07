import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const fetchTodos = async () => {
    const res = await axios.get(
      "https://3cf0a885-697e-484e-a7ff-42251dfdc081-00-nu119gqn8ojh.sisko.replit.dev/todos",
    );
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text) return;
    await axios.post(
      "https://3cf0a885-697e-484e-a7ff-42251dfdc081-00-nu119gqn8ojh.sisko.replit.dev/todos",
      { text, priority }
    );
    setText("");
    setPriority("medium");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `https://3cf0a885-697e-484e-a7ff-42251dfdc081-00-nu119gqn8ojh.sisko.replit.dev/todos/${id}`,
    );
    fetchTodos();
  };

  const toggleComplete = async (id, currentStatus) => {
    await axios.put(
      `https://3cf0a885-697e-484e-a7ff-42251dfdc081-00-nu119gqn8ojh.sisko.replit.dev/todos/${id}`,
      { completed: !currentStatus }
    );
    fetchTodos();
  };

  const updatePriority = async (id, newPriority) => {
    await axios.put(
      `https://3cf0a885-697e-484e-a7ff-42251dfdc081-00-nu119gqn8ojh.sisko.replit.dev/todos/${id}`,
      { priority: newPriority }
    );
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="todo-form">
        <input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="add-button" onClick={addTodo}>
          Add Task
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id, todo.completed)}
            />
            <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
              {todo.text}
            </span>
            <span className={`priority priority-${todo.priority}`}>
              {todo.priority}
            </span>
            <select
              className="priority-selector"
              value={todo.priority}
              onChange={(e) => updatePriority(todo._id, e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="todo-actions">
              <button
                className="complete-button"
                onClick={() => toggleComplete(todo._id, todo.completed)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;