import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const updateUsername = useCallback(() => {
        setUsername('greekgeek');
    }, [setUsername]);

    const updateFirstname = useCallback(() => {
        setFirstname('Eleni');
    }, [setFirstname]);

    const updateLastname = useCallback(() => {
        setLastname('Rotsides');
    }, [setLastname]);

    return (
        <div className="App">
            <div>
                {username}
                <br />
                {firstname}
                <br />
                {lastname}
                <br />
            </div>
            <button onClick={updateUsername}>Set Username</button>
            <button onClick={updateFirstname}>Set First Name</button>
            <button onClick={updateLastname}>Set Last Name</button>
        </div>
    );
}

export default App;
