const router = require('express').Router();
const TodoSchema = require('../models/todoSchema')


router.get('/', async (req, res) => {
    try {
      const todos = await TodoSchema.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Todos' });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const todo = new TodoSchema({
        text: req.body.text
      });
  
      const savedTodo = await todo.save();
      res.status(200).json(savedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Error creating Todo' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const todo = await TodoSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated todo
      );
  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Error updating Todo' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const todo = await TodoSchema.findByIdAndRemove(req.params.id);
  
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
  
      res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Todo' });
    }
  });
  

module.exports = router;