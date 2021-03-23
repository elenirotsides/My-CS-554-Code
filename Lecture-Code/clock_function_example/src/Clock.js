import React, { useState, useEffect } from 'react';
import './App.css';

function Clock(props) {
    const [clockData, setClock] = useState(props.date);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        const tick = () => {
            setClock(new Date());
        };

        return () => {
            //Any cleanup will go here ie unmounting
            clearInterval(timerID);
        };
    }, []);

    return (
        <div className="App">
            <h2>The current time is: {clockData.toLocaleTimeString()}</h2>
        </div>
    );
}

export default Clock;
