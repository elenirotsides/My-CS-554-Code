import React, { useState } from 'react';
import './App.css';

function App(props) {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    return (
        <div className="App">
            <p>The current count is: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => (count <= 0 ? setCount(0) : setCount(count - 1))}>-1</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <input onChange={(e) => setText(e.target.value)} />
            <br />
            <p>The text is: {text}</p>
        </div>
    );
}

export default App;
