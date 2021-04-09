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

const Characters = (props) => {
    const [characterData, setCharacterData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [badRequest, setBadRequest] = useState(false);
    const classes = useStyles();

    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${props.match.params.id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    useEffect(() => {
        console.log('useEffect fired');
        async function fetchData() {
            try {
                const { data: character } = await axios.get(url);
                setCharacterData(character.data.results);
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
    let names = [];
    if (characterData && characterData[0].comics.available > 0) {
        characterData[0].comics.items.forEach((element) => names.push(element.name));
    }

    let series = [];
    if (characterData && characterData[0].series.available > 0) {
        characterData[0].series.items.forEach((element) => series.push(element.name));
    }

    let stories = [];
    if (characterData && characterData[0].stories.available > 0) {
        characterData[0].stories.items.forEach((element) => stories.push(element.name));
    }

    let events = [];
    if (characterData && characterData[0].events.available > 0) {
        characterData[0].events.items.forEach((element) => events.push(element.name));
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
                <CardHeader className={classes.titleHead} title={characterData.name} />
                <CardMedia
                    className={classes.media}
                    component="img"
                    image={
                        characterData[0].thumbnail && characterData[0].thumbnail.path && characterData[0].thumbnail.extension
                            ? `${characterData[0].thumbnail.path}/portrait_incredible.${characterData[0].thumbnail.extension}`
                            : noImage
                    }
                    title="show image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="span">
                        <dl>
                            <p>
                                <dt className="title">Description</dt> <br />
                                {characterData && characterData[0].description ? <dd>{characterData[0].description}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Comics</dt> <br />
                                {names && names.length > 0 ? <dd>{names.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Series</dt> <br />
                                {series && series.length > 0 ? <dd>{series.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Stories</dt> <br />
                                {stories && stories.length > 0 ? <dd>{stories.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className="title">Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to="/characters/page/0">Back to all characters...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Characters;
