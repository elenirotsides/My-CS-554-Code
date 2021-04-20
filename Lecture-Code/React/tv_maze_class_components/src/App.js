import React from 'react';
import logo from './img/tvm-header-logo.png';
import './App.css';
import ShowList from './components/ShowList';
import Show from './components/Show';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to the TV Maze API</h1>
                    <Link className="showlink" to="/shows">
                        Shows
                    </Link>
                </header>
                <p>Welcome!</p>
                <Route exact path="/shows" component={ShowList} />
                <Route exact path="/shows/:id" component={Show} />
            </div>
        </Router>
    );
}

export default App;
