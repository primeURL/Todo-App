import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import axios from 'axios'
import env from '../env.json'
import '../styles/Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(env.backend_url)
        setTodos(response.data);
      } catch (error) {
        console.log('Error While Fetching Todos',error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async(text) => {
    try {
      const response = await axios.post(env.backend_url,{text})
      setTodos([...todos, response.data]); 
    } catch (error) {
      console.log('Error While Adding Todos',error);
    } 
  };

  const toggleTodo = async(id) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed, deleteBtn : !todo.deleteBtn } : todo
    );
    setTodos(updatedTodos);
    const updateTodo = todos.find((todo) => todo._id === id)
    try {
      await axios.put(`${env.backend_url}/${id}`,{ completed: !updateTodo.completed , deleteBtn : !updateTodo.deleteBtn })
    } catch (error) {
      console.log('Error While Toggling Todos',error);

    }
  };

  const editTodo = async(id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo._id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    try {
      await axios.put(`${env.backend_url}/${id}`,{ text : newText})
    } catch (error) {
      console.log('Error While Editing Todos',error)
    }
  };

  const deleteTodo = async(id) => {
    const updatedTodos = todos.filter((todo) => todo._id !== id);
    setTodos(updatedTodos);
    try {
      await axios.delete(`${env.backend_url}/${id}`)
    } catch (error) {
      console.log('Error While Deleting Todos',error)
    }
  };

  return (
    <div className='mainContainer'>
      <h1 className='heading'>Todo App</h1>
      <div>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      </div>
    </div>
  );
};

export default Todo;
