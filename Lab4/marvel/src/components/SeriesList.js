import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as secrets from '../secrets.json';
import noImage from '../img/download.jpeg';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';

const md5 = require('blueimp-md5');

const useStyles = makeStyles({
    card: {
        maxWidth: 250,
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

const SeriesList = (props) => {
    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [seriesData, setSeriesData] = useState(0);
    const [badRequest, setBadRequest] = useState(false);
    const [total, setTotal] = useState(undefined);
    let card = null;

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const { data } = await axios.get(url + `&offset=${props.match.params.page * 20}`);
                setSeriesData(data.data.results);
                setTotal(data.data.total);
                console.log(`Total: ${data.data.total}`);
                setLoading(false);
            } catch (e) {
                setBadRequest(true);
                setLoading(false);
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.page]);

    const buildCard = (series) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={series.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <Link to={`/series/${series.id}`}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={
                                    series.thumbnail && series.thumbnail.path && series.thumbnail.extension
                                        ? `${series.thumbnail.path}/portrait_incredible.${series.thumbnail.extension}`
                                        : noImage
                                }
                                title="series image"
                            />

                            <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant="h6" component="h2">
                                    {series.title}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

    const lastPage = Math.floor(total / 20);

    if (badRequest || parseFloat(props.match.params.page) > lastPage) {
        console.log('in the bad request!!');
        return (
            <div>
                <h2>ERROR 404: Nothing to show!</h2>
            </div>
        );
    }

    card =
        seriesData &&
        seriesData.map((series) => {
            return buildCard(series);
        });

    if (loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        if (parseFloat(props.match.params.page) === 0) {
            return (
                <div>
                    <Link to={`/series/page/${parseFloat(props.match.params.page) + 1}`}>
                        <button id="next" onClick={() => parseFloat(props.match.params.page) + 1}>
                            Next Page
                        </button>
                    </Link>
                    <br />
                    <br />
                    <Grid container className={classes.grid} spacing={5}>
                        {card}
                    </Grid>
                </div>
            );
        }
        if (parseFloat(props.match.params.page) === lastPage) {
            return (
                <div>
                    <Link to={`/series/page/${parseFloat(props.match.params.page) - 1}`}>
                        <button id="previous" onClick={() => parseFloat(props.match.params.page) - 1}>
                            Previous Page
                        </button>
                    </Link>
                    <br />
                    <br />
                    <Grid container className={classes.grid} spacing={5}>
                        {card}
                    </Grid>
                </div>
            );
        }
        return (
            <div>
                <Link to={`/series/page/${parseFloat(props.match.params.page) - 1}`}>
                    <button id="previous" onClick={() => parseFloat(props.match.params.page) - 1}>
                        Previous Page
                    </button>
                </Link>
                <Link to={`/series/page/${parseFloat(props.match.params.page) + 1}`}>
                    <button id="next" onClick={() => parseFloat(props.match.params.page + 1)}>
                        Next Page
                    </button>
                </Link>
                <br />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    }
};

export default SeriesList;
