import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }, [])

  const [newTodoText, setNewTodoText] = useState('')

function handleAddTodo() {
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newTodoText })
  })
    .then((res) => res.json())
    .then((newTodo) => {
      setTodos([...todos, newTodo])
      setNewTodoText('')
    })}

function handleDeleteTodo(id) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  })
    .then(() => {
      setTodos(todos.filter((todo) => todo.id !== id))
    })
}

function handleUpdateTodo(id, newText) {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({completed: !todos.find((todo) => todo.id === id).completed})
  })
    .then((res) => res.json())
    .then((updatedTodo) => {
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
    })
}

  return (
    <div>
      <h1>My To-Do List</h1>
      <ul>
        {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text} 
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          <button onClick={() => handleUpdateTodo(todo.id, todo.text)}>Toggle Complete</button>
        </li>
        
        ))}

        <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      </ul>
      
    </div>
  )
}

export default App
