import React from 'react';
import logo from './img/marvel.jpeg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CharactersList from './components/CharactersList';
import Comics from './components/Comics';
import Series from './components/Series';
import Characters from './components/Characters';
import ComicsList from './components/ComicsList';
import SeriesList from './components/SeriesList';

const App = () => {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Marvel</h1>
                    <Link className="showlink" to="/">
                        Home
                    </Link>
                    <Link className="showlink" to="/characters/page/0">
                        Characters
                    </Link>
                    <Link className="showlink" to="/comics/page/0">
                        Comics
                    </Link>
                    <Link className="showlink" to="/series/page/0">
                        Series
                    </Link>
                </header>
                <br />
                <br />
                <div className="App-body">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/characters/page/:page" component={CharactersList} />
                    <Route exact path="/characters/:id" component={Characters} />
                    <Route exact path="/comics/page/:page" component={ComicsList} />
                    <Route exact path="/comics/:id" component={Comics} />
                    <Route exact path="/series/page/:page" component={SeriesList} />
                    <Route exact path="/series/:id" component={Series} />
                </div>
            </div>
        </Router>
    );
};

export default App;
