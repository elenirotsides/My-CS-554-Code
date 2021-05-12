import React, { useEffect } from 'react';
import axios from 'axios';
import noImage from '../img/download.jpeg';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';

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

const ComicsList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.comics);

    let card = null;

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(actions.comicList(null, false, true, null));
                const { data } = await axios.get(`http://localhost:3001/comics/page/${props.match.params.page}`);

                dispatch(
                    actions.comicList(
                        (data && data.total) || (data && data.data && data.data.total),
                        false,
                        false,
                        (data && data.results) || (data && data.data && data.data.results)
                    )
                );
            } catch (e) {
                console.log(e);
                dispatch(actions.comicList(null, true, false, null));
            }
        }
        fetchData();
    }, [props.match.params.page]);

    const buildCard = (comic) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
                <Card className={classes.card} variant='outlined'>
                    <CardActionArea>
                        <Link to={`/comics/${comic.id}`}>
                            <CardMedia
                                className={classes.media}
                                component='img'
                                image={
                                    comic.thumbnail && comic.thumbnail.path && comic.thumbnail.extension
                                        ? `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`
                                        : noImage
                                }
                                title='comic image'
                            />

                            <CardContent>
                                <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                                    {comic.title}
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };
    console.log('total:');
    console.log(allState.total);
    const lastPage = Math.floor(allState.total / 20);

    card =
        allState &&
        allState.lis &&
        allState.lis.map((comics) => {
            return buildCard(comics);
        });

    if (allState.loading) {
        return (
            <div>
                <h2>Loading....</h2>
            </div>
        );
    } else if (allState.badRequest || parseFloat(props.match.params.page) > lastPage) {
        console.log('in the bad request!!');
        return (
            <div>
                <h2>ERROR 404: Nothing to show!</h2>
            </div>
        );
    } else {
        if (parseFloat(props.match.params.page) === 0) {
            return (
                <div>
                    <Link to={`/comics/page/${parseFloat(props.match.params.page) + 1}`}>
                        <button id='next' onClick={() => parseFloat(props.match.params.page) + 1}>
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
                    <Link to={`/comics/page/${parseFloat(props.match.params.page) - 1}`}>
                        <button id='previous' onClick={() => parseFloat(props.match.params.page) - 1}>
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
                <Link to={`/comics/page/${parseFloat(props.match.params.page) - 1}`}>
                    <button id='previous' onClick={() => parseFloat(props.match.params.page) - 1}>
                        Previous Page
                    </button>
                </Link>
                <Link to={`/comics/page/${parseFloat(props.match.params.page) + 1}`}>
                    <button id='next' onClick={() => parseFloat(props.match.params.page + 1)}>
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

export default ComicsList;
