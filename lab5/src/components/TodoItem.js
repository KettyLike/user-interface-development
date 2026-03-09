import React from 'react';

function TodoItem({ todo, toggleComplete }) {
  return (
    // Відображення одного завдання та обробка кліку для зміни статусу
    <li 
      className={todo.completed ? 'completed' : ''} 
      onClick={toggleComplete}
    >
      {todo.text}
    </li>
  );
}

export default TodoItem;
