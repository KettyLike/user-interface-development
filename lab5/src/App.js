import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  // Стан для збереження списку завдань
  const [todos, setTodos] = useState([]);

  // Додавання нового завдання до списку
  const addTodo = (text) => {
    if (text.trim() === '') return;
    setTodos([...todos, { text, completed: false }]);
  };

  // Перемикання статусу виконання завдання
  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Підрахунок кількості невиконаних завдань
  const incompleteCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="App">
      <h1>Лабораторна 5: React To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} />
      <p>Невиконаних завдань: {incompleteCount}</p>
    </div>
  );
}

export default App;
