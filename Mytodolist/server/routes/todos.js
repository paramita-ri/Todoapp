import express from 'express'
import Todo from '../models/Todo.js'

const router = express.Router()

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create new todo
router.post('/', async (req, res) => {
  const { task, status } = req.body

  try {
    const newTodo = new Todo({
      task,
      status: status || 'medium'
    })

    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update todo
router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedTodo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({ message: 'Todo deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router