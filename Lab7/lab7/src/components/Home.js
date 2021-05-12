import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <p className="hometext">Welcome! This site will allow you to explore Marvel Characters, Comics, and Series.</p>

            <p className="hometext">
                The application queries three of Marvel's API end-points to retrieve information about <Link to="/characters/page/0">Characters</Link>
                , <Link to="/comics/page/0">Comics</Link>, and <Link to="/series/page/0">Series</Link> in the Marvel Universe! You can click on the
                cards in these pages for more details about that particular item.
            </p>
        </div>
    );
};

export default Home;
