// import logo from './logo.svg';
import './App.css';
import PropsExample from './PropsExample';

function App() {
    const greeting = 'Hello Function Component!';
    const handle_func = () => {
        console.log('Hello from within handle_fun in app.js');
    };
    return (
        <div className="App">
            <PropsExample greeting={greeting} user={{ name: 'Eleni Rotsides', username: 'eleniiiii' }} handleClick={handle_func} />
        </div>
    );
}

export default App;

// Same thing, but as a Class Component!!!!!

// import React, { Component } from 'react';
// import './App.css';
// import PropsExample from './PropsExample';

// class App extends Component {
//     render() {
//         const greeting = 'Hello Function Component!';
//         const handle_func = () => {
//             console.log('Hello, from the function in app.js');
//         };
//         return <PropsExample greeting={greeting} user={{ name: 'Eleni Rotsides', username: 'eleniiiii' }} handleClick={handle_func} />;
//     }
// }
// export default App;
