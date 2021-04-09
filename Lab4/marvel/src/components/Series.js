import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
import * as secrets from '../secrets.json';

const md5 = require('blueimp-md5');
const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #a87c7c',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
    },
    titleHead: {
        borderBottom: '1px solid #a87c7c',
        fontWeight: 'bold',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    media: {
        height: '100%',
        width: '100%',
    },
    button: {
        color: '#a87c7c',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

const Series = (props) => {
    const [seriesData, setSeriesData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [badRequest, setBadRequest] = useState(false);
    const classes = useStyles();

    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/series/${props.match.params.id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    useEffect(() => {
        console.log('useEffect fired');
        async function fetchData() {
            try {
                const { data: series } = await axios.get(url);
                setSeriesData(series.data.results);
                setLoading(false);
            } catch (e) {
                setBadRequest(true);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    if (badRequest) {
        console.log('in the bad request!!');
        return (
            <div>
                <h2>ERROR 404: Nothing to show!</h2>
            </div>
        );
    }

    let creators = [];
    if (seriesData && seriesData[0].creators.available > 0) {
        seriesData[0].creators.items.forEach((element) => creators.push(` ${element.name} - ${element.role}`));
    }

    let characters = [];
    if (seriesData && seriesData[0].characters.available > 0) {
        seriesData[0].characters.items.forEach((element) => characters.push(element.name));
    }

    let comics = [];
    if (seriesData && seriesData[0].comics.available > 0) {
        seriesData[0].comics.items.forEach((element) => comics.push(element.name));
    }

    let events = [];
    if (seriesData && seriesData[0].events.available > 0) {
        seriesData[0].events.items.forEach((element) => events.push(element.name));
    }

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant="outlined">
                <CardHeader className={classes.titleHead} title={seriesData.name} />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        seriesData[0].thumbnail && seriesData[0].thumbnail.path && seriesData[0].thumbnail.extension
                            ? `${seriesData[0].thumbnail.path}/portrait_incredible.${seriesData[0].thumbnail.extension}`
                            : noImage
                    }
                    title="show image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="span">
                        <dl>
                            <p>
                                <dt className="title">Description</dt> <br />
                                {seriesData && seriesData[0].description ? <dd>{seriesData[0].description}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Start Year</dt>
                                {seriesData && seriesData[0].startYear ? <dd>{seriesData[0].startYear}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">End Year</dt>
                                {seriesData && seriesData[0].endYear ? <dd>{seriesData[0].endYear}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Rating</dt>
                                {seriesData && seriesData[0].rating ? <dd>{seriesData[0].rating}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Creators</dt> <br />
                                {creators && creators.length > 0 ? <dd>{creators.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Characters</dt> <br />
                                {characters && characters.length > 0 ? <dd>{characters.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Comics</dt> <br />
                                {comics && comics.length > 0 ? <dd>{comics.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to="/series/page/0">Back to all series...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Series;
