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

const Comics = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.comics);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(actions.getComicData(false, true, null));
                const { data } = await axios.get(`http://localhost:3001/comics/${props.match.params.id}`);
                dispatch(actions.getComicData(false, false, data));
            } catch (e) {
                dispatch(actions.getComicData(true, false, null));
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

    let events = [];
    if (allState && allState.comic && allState.comic.events.available > 0) {
        allState.events.items.forEach((element) => events.push(element.name));
    }

    let urls = [];
    if (allState && allState.comic && allState.comic.urls.length > 0) {
        allState.comic.urls.forEach((element) => urls.push(element.url));
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
                <CardHeader className={classes.titleHead} title={allState && allState.comic && allState.comic.title} />
                <CardMedia
                    className={classes.media}
                    component='img'
                    image={
                        allState && allState.comic && allState.comic.thumbnail && allState.comic.thumbnail.path && allState.comic.thumbnail.extension
                            ? `${allState.comic.thumbnail.path}/portrait_incredible.${allState.comic.thumbnail.extension}`
                            : noImage
                    }
                    title='show image'
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        <dl>
                            <p>
                                <dt className='title'>Page Count</dt> <br />
                                <dd>{allState && allState.pageCount ? allState.pageCount : <dd>Nothing to show</dd>}</dd>
                            </p>
                            <p>
                                <dt className='title'>Description</dt> <br />
                                {allState && allState.description ? <dd>{allState.description}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Websites</dt> <br />
                                {urls && urls.length > 0 ? <dd>{urls.toString().replace(',', ' ')}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Series</dt> <br />
                                {allState && allState.comic && allState.comic.series.name ? (
                                    <dd>{allState.comic.series.name}</dd>
                                ) : (
                                    <dd>Nothing to show</dd>
                                )}
                            </p>
                            <p>
                                <dt className='title'>Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to='/comics/page/0'>Back to all comics...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Comics;
