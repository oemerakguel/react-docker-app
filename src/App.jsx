import { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'all' ? true : filter === 'done' ? todo.done : !todo.done
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-do-Liste</h1>
      <TodoInput onAdd={addTodo} />
      <div>
        <button onClick={() => setFilter('all')}>Alle</button>
        <button onClick={() => setFilter('open')}>Offen</button>
        <button onClick={() => setFilter('done')}>Erledigt</button>
      </div>
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
