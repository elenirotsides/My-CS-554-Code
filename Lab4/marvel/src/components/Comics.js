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

const Comics = (props) => {
    const [comicData, setComicData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [badRequest, setBadRequest] = useState(false);
    const classes = useStyles();

    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${props.match.params.id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    useEffect(() => {
        console.log('useEffect fired');
        async function fetchData() {
            try {
                const { data: comic } = await axios.get(url);
                setComicData(comic.data.results);
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

    let events = [];
    if (comicData && comicData[0].events.available > 0) {
        comicData[0].events.items.forEach((element) => events.push(element.name));
    }

    let urls = [];
    if (comicData && comicData[0].urls.length > 0) {
        comicData[0].urls.forEach((element) => urls.push(element.url));
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
                <CardHeader className={classes.titleHead} title={comicData.title} />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        comicData[0].thumbnail && comicData[0].thumbnail.path && comicData[0].thumbnail.extension
                            ? `${comicData[0].thumbnail.path}/portrait_incredible.${comicData[0].thumbnail.extension}`
                            : noImage
                    }
                    title="show image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="span">
                        <dl>
                            <p>
                                <dt className="title">Page Count</dt> <br />
                                <dd>{comicData && comicData[0].pageCount ? comicData[0].pageCount : <dd>Nothing to show</dd>}</dd>
                            </p>
                            <p>
                                <dt className="title">Description</dt> <br />
                                {comicData && comicData[0].description ? <dd>{comicData[0].description}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Websites</dt> <br />
                                {urls && urls.length > 0 ? <dd>{urls.toString().replace(',', ' ')}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Series</dt> <br />
                                {comicData && comicData[0].series.name ? <dd>{comicData[0].series.name}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to="/comics/page/0">Back to all comics...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Comics;
