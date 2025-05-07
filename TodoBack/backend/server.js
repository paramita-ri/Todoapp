const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://todolistdb:todolistdb@cluster0.zewbaa7.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// Add new todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ 
    text: req.body.text,
    priority: req.body.priority || 'medium'
  });
  await newTodo.save();
  res.json(newTodo);
});

// Delete todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Update todo (priority and completion status)
app.put('/todos/:id', async (req, res) => {
  const { priority, completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { priority, completed },
    { new: true }
  );
  res.json(updatedTodo);
});

app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

app.listen(process.env.PORT || 3001, () => console.log("Server is running"));