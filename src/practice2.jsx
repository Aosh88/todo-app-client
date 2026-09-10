import { useState } from 'react'


function Practice2() {
  const [text, setText] = useState('')
 
    async function sendText() {
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    })
        .then((res) => res.json())
        .then((data) => setText(data.text))

}

  return (
    <div>
      <h1>Practice Component</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendText}>Send</button>
      <ul>
        {todo.map(() => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  )


}

export default Practice2