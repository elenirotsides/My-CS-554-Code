import React, { useContext } from 'react';
import './App.css';
import ThemeContext from './ThemeContext';
import ChildChildComponent from './ChildChildComponent';

function ChildComponent() {
    const theme = useContext(ThemeContext);
    return (
        <div className="App">
            <p style={theme}>Hello World!</p>
            <ChildChildComponent />
        </div>
    );
}

export default ChildComponent;
