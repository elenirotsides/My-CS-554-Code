import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../img/download.jpeg';
import { makeStyles, Card, CardContent, CardMedia, Typography, CardHeader } from '@material-ui/core';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';

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
    const classes = useStyles();
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.series);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(actions.getSeriesData(false, true, null));
                const { data } = await axios.get(`http://localhost:3001/series/${props.match.params.id}`);
                dispatch(actions.getSeriesData(false, false, data));
            } catch (e) {
                dispatch(actions.getSeriesData(true, false, null));
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.id]);

    if (allState.badRequest) {
        return (
            <div>
                <h2>ERROR 404: Nothing to show!</h2>
            </div>
        );
    }

    let creators = [];
    if (allState && allState.series && allState.series.creators.available > 0) {
        allState.series.creators.items.forEach((element) => creators.push(` ${element.name} - ${element.role}`));
    }

    let characters = [];
    if (allState && allState.series && allState.series.characters.available > 0) {
        allState.series.characters.items.forEach((element) => characters.push(element.name));
    }

    let comics = [];
    if (allState && allState.series && allState.series.comics.available > 0) {
        allState.series.comics.items.forEach((element) => comics.push(element.name));
    }

    let events = [];
    if (allState && allState.series && allState.series.events.available > 0) {
        allState.series.events.items.forEach((element) => events.push(element.name));
    }

    if (allState.loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant='outlined'>
                <CardHeader className={classes.titleHead} title={allState && allState.series && allState.series.name} />
                <CardMedia
                    className={classes.media}
                    component='img'
                    image={
                        allState &&
                        allState.series &&
                        allState.series.thumbnail &&
                        allState.series.thumbnail.path &&
                        allState.series.thumbnail.extension
                            ? `${allState.series.thumbnail.path}/portrait_incredible.${allState.series.thumbnail.extension}`
                            : noImage
                    }
                    title='show image'
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        <dl>
                            <p>
                                <dt className='title'>Description</dt> <br />
                                {allState && allState.series && allState.series.description ? (
                                    <dd>{allState.series.description}</dd>
                                ) : (
                                    <dd>Nothing to show</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Start Year</dt>
                                {allState && allState.series && allState.series.startYear ? (
                                    <dd>{allState.series.startYear}</dd>
                                ) : (
                                    <dd>Nothing to show</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>End Year</dt>
                                {allState && allState.series && allState.series.endYear ? (
                                    <dd>{allState.series.endYear}</dd>
                                ) : (
                                    <dd>Nothing to show</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Rating</dt>
                                {allState && allState.series && allState.series.rating ? <dd>{allState.series.rating}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Creators</dt> <br />
                                {creators && creators.length > 0 ? <dd>{creators.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Characters</dt> <br />
                                {characters && characters.length > 0 ? <dd>{characters.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Comics</dt> <br />
                                {comics && comics.length > 0 ? <dd>{comics.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to='/series/page/0'>Back to all series...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Series;
