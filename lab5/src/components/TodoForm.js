import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  // Стан для тексту нового завдання
  const [input, setInput] = useState('');

  // Обробка відправлення форми
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Введіть завдання..."
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default TodoForm;
