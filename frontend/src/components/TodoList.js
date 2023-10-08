import React,{useState} from 'react';
import '../styles/TodoList.css'

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo}) => {
  const [editText, setEditText] = useState('');
  const [editMode, setEditMode] = useState(null);

  const handleEdit = (id, text) => {
    setEditText(text);
    setEditMode(id);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      editTodo(id, editText);
      setEditMode(null);
    }
  };
  return (
    <div>
      <ul className='todosListMain'>
        {todos.map((todo) => (
          <li key={todo._id} className='todoList'>
            <input
              className='inputCheckbox'
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
            />
            {editMode === todo._id ? (
            <>
              <input
                className='editInputCheckbox'
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className='saveBtn' onClick={() => handleSaveEdit(todo._id)}>Save</button>
            </>
          ) : (
            <>
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              <button className='editBtn' onClick={() => handleEdit(todo._id, todo.text)}>Edit</button>
            </>
          )}
            <button className='deleteBtn' disabled={todo.deleteBtn} style={{backgroundColor : !todo.deleteBtn ? 'red' : 'gray' }} onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
