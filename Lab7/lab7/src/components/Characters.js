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

const Characters = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.characters);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(actions.getCharacterData(false, true, null));
                const { data } = await axios.get(`http://localhost:3001/characters/${props.match.params.id}`);
                dispatch(actions.getCharacterData(false, false, data));
            } catch (e) {
                dispatch(actions.getCharacterData(true, false, null));
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

    let names = [];
    if (allState && allState.char && allState.char.comics.available > 0) {
        allState.char.comics.items.forEach((element) => names.push(element.name));
    }

    let series = [];
    if (allState && allState.char && allState.char.series.available > 0) {
        allState.char.series.items.forEach((element) => series.push(element.name));
    }

    let stories = [];
    if (allState && allState.char && allState.char.stories.available > 0) {
        allState.char.stories.items.forEach((element) => stories.push(element.name));
    }

    let events = [];
    if (allState && allState.char && allState.char.events.available > 0) {
        allState.char.events.items.forEach((element) => events.push(element.name));
    }

    if (allState.loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else if (allState.badRequest) {
        console.log('in the bad request!!');
        return (
            <div>
                <h2>ERROR 404: Nothing to show!</h2>
            </div>
        );
    } else {
        return (
            <Card className={classes.card} variant='outlined'>
                <CardHeader className={classes.titleHead} title={allState && allState.char && allState.char.name} />
                <CardMedia
                    className={classes.media}
                    component='img'
                    image={
                        allState && allState.char && allState.char.thumbnail && allState.char.thumbnail.path && allState.char.thumbnail.extension
                            ? `${allState.char.thumbnail.path}/portrait_incredible.${allState.char.thumbnail.extension}`
                            : noImage
                    }
                    title='show image'
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='span'>
                        <dl>
                            <p>
                                <dt className='title'>Description</dt> <br />
                                {allState.char && allState.char.description ? <dd>{allState.char.description}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Comics</dt> <br />
                                {names && names.length > 0 ? <dd>{names.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Series</dt> <br />
                                {series && series.length > 0 ? <dd>{series.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Stories</dt> <br />
                                {stories && stories.length > 0 ? <dd>{stories.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                            <p>
                                <dt className='title'>Events</dt> <br />
                                {events && events.length > 0 ? <dd>{events.toString()}</dd> : <dd>Nothing to show</dd>}
                            </p>
                        </dl>
                        <Link to='/characters/page/0'>Back to all characters...</Link>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
};

export default Characters;
