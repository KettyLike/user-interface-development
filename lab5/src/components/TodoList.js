import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete }) {
  return (
    // Рендер списку завдань через компонент TodoItem
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem 
          key={index} 
          todo={todo} 
          toggleComplete={() => toggleComplete(index)} 
        />
      ))}
    </ul>
  );
}

export default TodoList;
