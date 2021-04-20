import React, { Component } from 'react';
import axios from 'axios';
import noImage from '../img/notAvail.png';

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = { showData: undefined };
    }

    async getShow() {
        try {
            const { data } = await axios.get(`http://api.tvmaze.com/shows/${this.props.match.params.id}`);
            this.setState({ showData: data });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getShow();
    }

    render() {
        const regex = /(<([^>]+)>)/gi;
        return (
            <div className="show-body">
                <h1 className="cap-first-letter">{(this.state.showData && this.state.showData.name) || 'No Title'}</h1>
                <img alt="Show" src={(this.state.showData && this.state.showData.image && this.state.showData.image.medium) || noImage} />
                <br />
                <br />
                <p>
                    Average Rating: {(this.state.showData && this.state.showData.rating.average) || 'No Rating'}
                    <br />
                    Network: {(this.state.showData && this.state.showData.network && this.state.showData.network.name) || 'No Network Name'}
                    <br />
                    Language: {(this.state.showData && this.state.showData.language) || 'Not specified'}
                    <br />
                    Runtime: {(this.state.showData && this.state.showData.runtime) || 'Not specified'}
                    <br />
                    Premiered: {(this.state.showData && this.state.showData.premiered) || 'Not specified'}
                    <br />
                    Genres:
                </p>
                <dl>
                    {(this.state.showData &&
                        this.state.showData.genres.map((genre) => {
                            return <dt key={genre}>{genre}</dt>;
                        })) ||
                        'No Genres'}
                </dl>
                <p>
                    Summary: {(this.state.showData && this.state.showData.summary && this.state.showData.summary.replace(regex, '')) || 'No Summary'}
                </p>
            </div>
        );
    }
}

export default Show;
