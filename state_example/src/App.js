// import logo from './logo.svg';
import './App.css';
import Clock from './clock';

function App() {
    return (
        <div className="App">
            <Clock date={new Date()} />
        </div>
    );
}

export default App;
