import React, { useState } from 'react';

interface Todo {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState<{ mode: boolean; index: number | null }>({ mode: false, index: null });
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const completeTodo = (index: number) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index: number) => {
    if (editMode.mode && editMode.index !== index) {
      setEditMode({ mode: false, index: null });
      setEditText('');
    }
    setEditMode({ mode: true, index });
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    if (editMode.index !== null) {
      const updatedTodos = todos.map((todo, idx) =>
        idx === editMode.index ? { ...todo, text: editText } : todo
      );
      setTodos(updatedTodos);
      setEditMode({ mode: false, index: null });
      setEditText('');
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {editMode.mode && editMode.index === index ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                {!todo.completed && <button onClick={() => completeTodo(index)}>Complete</button>}
                <button onClick={() => editTodo(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
