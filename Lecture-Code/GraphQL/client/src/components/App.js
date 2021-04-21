import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                        Learn React
                    </a>
                </header>
            </div>
        </ApolloProvider>
    );
}

export default App;
