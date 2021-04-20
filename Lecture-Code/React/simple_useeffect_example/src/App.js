import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [shows, setShowData] = useState(undefined);

    useEffect(() => {
        console.log('useEffect has been called');
        // another way to do it!
        // axios.get('http://api.tvmaze.com/show').then(({ data }) => {
        //     setShowData(data);
        //     console.log(data);
        // });

        async function fetchData() {
            try {
                const { data } = await axios.get('http://api.tvmaze.com/show');
                setShowData(data);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <ul>{shows && shows.map((show) => <li key={show.id}>{show.name}</li>)}</ul>
        </div>
    );
}

export default App;
