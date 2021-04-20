import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noImage from '../img/notAvail.png';

const Show = (props) => {
    const [showData, setShowData] = useState(undefined);
    let summary = null;
    let img = null;
    const regex = /(<([^>]+)>)/gi;

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('http://api.tvmaze.com/shows/' + props.match.params.id);
                setShowData(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    if (showData && showData.summary) {
        summary = showData && showData.summary.replace(regex, '');
    } else {
        summary = 'No Summary';
    }

    if (showData && showData.image && showData.image.medium) {
        img = <img alt="Show" src={showData.image.medium} />;
    } else {
        img = <img alt="Show" src={noImage} />;
    }

    return (
        <div className="show-body">
            <h1 className="cap-first-letter">{(showData && showData.name) || 'No Title'}</h1>
            <img alt="Show" src={(showData && showData.image && showData.image.medium) || noImage} />
            <br />
            <br />
            <p>
                Average Rating: {(showData && showData.rating.average) || 'No Rating'}
                <br />
                Network: {(showData && showData.network && showData.network.name) || 'No Network Name'}
                <br />
                Language: {(showData && showData.language) || 'Not specified'}
                <br />
                Runtime: {(showData && showData.runtime) || 'Not specified'}
                <br />
                Premiered: {(showData && showData.premiered) || 'Not specified'}
                <br />
                Genres:
            </p>
            <dl>
                {(showData &&
                    showData.genres.map((genre) => {
                        return <dt key={genre}>{genre}</dt>;
                    })) ||
                    'No Genres'}
            </dl>
            <p>Summary: {(showData && showData.summary && showData.summary.replace(regex, '')) || summary}</p>
        </div>
    );
};

export default Show;
