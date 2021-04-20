import React, { useState } from 'react';
import './App.css';
import ThemeContext from './ThemeContext';
import ChildComponent from './ChildComponent';

function App() {
    const [theme, setTheme] = useState({ color: 'red', fontWeight: 'bold' });
    const toggleTheme = () => {
        if (theme.color === 'red') {
            setTheme({ color: 'green', fontWeight: 'bold' });
        } else {
            setTheme({ color: 'red', fontWeight: 'bold' });
        }
    };
    return (
        <div className="App">
            <ThemeContext.Provider value={theme}>
                <ChildComponent />
                <button onClick={toggleTheme}>Toggle Theme</button>
            </ThemeContext.Provider>
        </div>
    );
}

export default App;
