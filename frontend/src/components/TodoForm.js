import React, { useState } from 'react';
import '../styles/TodoForm.css'
const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='submitForm'>
      <input
        className='inputTodo'
        type="text"
        placeholder="Add a new Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='addBtn' type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
