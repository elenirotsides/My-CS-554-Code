import React, { useContext } from 'react';
import './App.css';
import ThemeContext from './ThemeContext';

function ChildChildComponent() {
    const theme = useContext(ThemeContext);
    return (
        <div className="App">
            <p style={theme}>Hello World Too!</p>
        </div>
    );
}

export default ChildChildComponent;
