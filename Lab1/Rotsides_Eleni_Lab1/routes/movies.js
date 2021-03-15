const express = require('express');
const router = express.Router();
const movieData = require('../data/movies');

router.get('/', async (req, res) => {
    let skip;
    let take;

    if (req.query.skip) {
        skip = parseFloat(req.query.skip);
        if (isNaN(skip)) {
            res.status(400).json({ error: 'Skip must be a number' });
            return;
        }
        if (skip < 0) {
            res.status(400).json({ error: 'Skip must be a positive number' });
        }
    }
    if (req.query.take) {
        take = parseFloat(req.query.take);
        if (isNaN(take)) {
            res.status(400).json({ error: 'Take must be a number' });
            return;
        }
        if (take < 0) {
            res.status(400).json({ error: 'Take must be a positive number' });
        }
    }

    if (skip && take) {
        try {
            const movieList = await movieData.getMovies(skip, take);
            res.status(200).json(movieList);
        } catch (e) {
            res.status(500).json(e);
        }
    } else if (take) {
        try {
            const movieList = await movieData.getMovies(0, take);
            res.status(200).json(movieList);
        } catch (e) {
            res.status(500).json(e);
        }
    } else if (skip) {
        try {
            const movieList = await movieData.getMovies(skip, 0);
            res.status(200).json(movieList);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        try {
            const movieList = await movieData.getMovies(0, 0);
            res.status(200).json(movieList);
        } catch (e) {
            res.status(500).json(e);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await movieData.getMovieByID(req.params.id);
        res.status(200).json(movie);
    } catch (e) {
        res.status(404).json({ message: 'Movie not found' });
    }
});

router.post('/', async (req, res) => {
    let movieInfo = req.body;

    if (!movieInfo) {
        res.status(400).json({ error: 'You must provide data to add a movie entry' });
        return;
    }

    if (!movieInfo.title) {
        res.status(400).json({ error: 'You must provide a title for your movie' });
        return;
    }

    if (!movieInfo.cast) {
        res.status(400).json({ error: 'You must provide a cast for your movie (an array of objects)' });
        return;
    }

    if (!movieInfo.info) {
        res.status(400).json({ error: 'You must provide an info object for your movie' });
        return;
    }

    if (!movieInfo.plot) {
        res.status(400).json({ error: 'You must provide a plot for your movie' });
        return;
    }

    if (!movieInfo.rating) {
        res.status(400).json({ error: 'You must provide a rating for your movie' });
        return;
    }

    if (movieInfo.title) {
        if (typeof movieInfo.title !== 'string') {
            res.status(400).json({ error: 'Title must be a string' });
            return;
        }
    }
    if (movieInfo.cast) {
        if (!Array.isArray(movieInfo.cast)) {
            res.status(400).json({ error: 'Cast must be an array of objects' });
            return;
        }
        for (let i = 0; i < movieInfo.cast.length; i++) {
            if (typeof movieInfo.cast[i] !== 'object') {
                res.status(400).json({ error: 'Cast needs to be an array of objects' });
                return;
            }
            if (!movieInfo.cast[i].firstName || !movieInfo.cast[i].lastName) {
                res.status(400).json({ error: 'You need to include a firstName and a lastName' });
                return;
            }
            if (Object.keys(movieInfo.cast[i]).length !== 2) {
                res.status(400).json({ error: "'There needs to be two key value pairs in each cast object'" });
                return;
            }
            if (typeof movieInfo.cast[i].firstName !== 'string' || typeof movieInfo.cast[i].lastName !== 'string') {
                res.status(400).json({ error: 'firstName and lastName must be strings' });
                return;
            }
        }
    }
    if (movieInfo.info) {
        if (typeof movieInfo.info !== 'object') {
            res.status(400).json({ error: 'Info must be an object' });
            return;
        }
        if (!movieInfo.info.director || !movieInfo.info.yearReleased) {
            res.status(400).json({ error: 'You must provide a director and a yearReleased' });
            return;
        }
        if (typeof movieInfo.info.director !== 'string') {
            res.status(400).json({ error: 'Director must be a string' });
            return;
        }
        if (typeof movieInfo.info.yearReleased !== 'number') {
            res.status(400).json({ error: 'yearReleased must be a number' });
            return;
        }
        if (Object.keys(movieInfo.info).length !== 2) {
            res.status(400).json({ error: 'There can only be 2 key value pairs in the info object' });
            return;
        }
    }
    if (movieInfo.plot) {
        if (typeof movieInfo.plot !== 'string') {
            res.status(400).json({ error: 'Plor must be a string' });
            return;
        }
    }
    if (movieInfo.rating) {
        if (typeof movieInfo.rating !== 'number') {
            res.status(400).json({ error: 'Rating must be a number' });
            return;
        }
        if (movieInfo.rating < 0 || movieInfo.rating > 5) {
            res.status(400).json({ error: 'Rating must be a number between 0 and 5, inclusive.' });
            return;
        }
    }

    if (Object.keys(movieInfo).length !== 5) {
        res.status(400).json({ error: 'There can only be 5 key value pairs in the supplied object' });
        return;
    }

    try {
        const newMovie = await movieData.addMovie(movieInfo.title, movieInfo.cast, movieInfo.info, movieInfo.plot, movieInfo.rating);
        res.status(200).json(newMovie);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put('/:id', async (req, res) => {
    let movieInfo = req.body;

    if (!movieInfo) {
        res.status(400).json({ error: 'You must provide data to add a movie' });
        return;
    }

    if (!movieInfo.title) {
        res.status(400).json({ error: 'You must provide a title for your movie' });
        return;
    }

    if (!movieInfo.cast) {
        res.status(400).json({ error: 'You must provide a cast for your movie' });
        return;
    }

    if (!movieInfo.info) {
        res.status(400).json({ error: 'You must provide information for your movie' });
        return;
    }

    if (!movieInfo.plot) {
        res.status(400).json({ error: 'You must provide a plot for your movie' });
        return;
    }

    if (!movieInfo.rating) {
        res.status(400).json({ error: 'You must provide a rating for your movie' });
        return;
    }

    if (movieInfo.title) {
        if (typeof movieInfo.title !== 'string') {
            res.status(400).json({ error: 'Title must be a string' });
            return;
        }
    }
    if (movieInfo.cast) {
        if (!Array.isArray(movieInfo.cast)) {
            res.status(400).json({ error: 'Cast must be an array of objects' });
            return;
        }
        for (let i = 0; i < movieInfo.cast.length; i++) {
            if (typeof movieInfo.cast[i] !== 'object') {
                res.status(400).json({ error: 'Cast needs to be an array of objects' });
                return;
            }
            if (!movieInfo.cast[i].firstName || !movieInfo.cast[i].lastName) {
                res.status(400).json({ error: 'You need to include a firstName and a lastName' });
                return;
            }
            if (Object.keys(movieInfo.cast[i]).length !== 2) {
                res.status(400).json({ error: 'There needs to be two key value pairs in each cast object' });
                return;
            }
            if (typeof movieInfo.cast[i].firstName !== 'string' || typeof movieInfo.cast[i].lastName !== 'string') {
                res.status(400).json({ error: 'firstName and lastName must be strings' });
                return;
            }
        }
    }
    if (movieInfo.info) {
        if (typeof movieInfo.info !== 'object') {
            res.status(400).json({ error: 'Info must be an object' });
            return;
        }
        if (!movieInfo.info.director || !movieInfo.info.yearReleased) {
            res.status(400).json({ error: 'You must provide a director and a yearReleased' });
            return;
        }
        if (typeof movieInfo.info.director !== 'string') {
            res.status(400).json({ error: 'Director must be a string' });
            return;
        }
        if (typeof movieInfo.info.yearReleased !== 'number') {
            res.status(400).json({ error: 'yearReleased must be a number' });
            return;
        }
        if (Object.keys(movieInfo.info).length !== 2) {
            res.status(400).json({ error: 'There can only be 2 key value pairs in the info object' });
            return;
        }
    }

    if (movieInfo.plot) {
        if (typeof movieInfo.plot !== 'string') {
            res.status(400).json({ error: 'Plot must be a string' });
            return;
        }
    }

    if (movieInfo.rating) {
        if (typeof movieInfo.rating !== 'number') {
            res.status(400).json({ error: 'Rating must be a number' });
            return;
        }
        if (movieInfo.rating < 0 || movieInfo.rating > 5) {
            res.status(400).json({ error: 'Rating must be a number between 0 and 5, inclusive.' });
            return;
        }
    }

    if (Object.keys(movieInfo).length !== 5) {
        res.status(400).json({ error: 'There can only be 5 key value pairs in the supplied object' });
        return;
    }

    try {
        await movieData.getMovieByID(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Movie not found' });
        return;
    }

    try {
        const updatedMovie = await movieData.updateMovie(req.params.id, movieInfo);
        res.status(200).json(updatedMovie);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.patch('/:id', async (req, res) => {
    const requestBody = req.body;

    let updatedMovieObj = {};

    try {
        const oldMovie = await movieData.getMovieByID(req.params.id);

        if (requestBody.title && requestBody.title !== oldMovie.title) {
            if (typeof requestBody.title !== 'string') {
                res.status(400).json({ error: 'Title must be a string' });
                return;
            }
            updatedMovieObj.title = requestBody.title;
        }
        if (requestBody.cast && requestBody.cast !== oldMovie.cast) {
            if (!Array.isArray(requestBody.cast)) {
                res.status(400).json({ error: 'Cast must be an array' });
                return;
            }
            for (let i = 0; i < requestBody.cast.length; i++) {
                if (typeof requestBody.cast[i] !== 'object') {
                    res.status(400).json({ error: 'Cast needs to be an array of objects' });
                    return;
                }
                if (!requestBody.cast[i].firstName || !requestBody.cast[i].lastName) {
                    res.status(400).json({ error: 'You need to include a firstName and a lastName' });
                    return;
                }
                if (Object.keys(requestBody.cast[i]).length !== 2) {
                    res.status(400).json({ error: 'There needs to be two key value pairs in each cast object' });
                    return;
                }
                if (typeof requestBody.cast[i].firstName !== 'string' || typeof requestBody.cast[i].lastName !== 'string') {
                    res.status(400).json({ error: 'firstName and lastName must be strings' });
                    return;
                }
            }
            updatedMovieObj.cast = requestBody.cast;
        }
        if (requestBody.info && requestBody.info !== oldMovie.info) {
            if (typeof requestBody.info !== 'object') {
                res.status(400).json({ error: 'Info must be an object' });
                return;
            }
            if (!requestBody.info.director) {
                res.status(400).json({ error: 'You need to include a director' });
                return;
            }
            if (!requestBody.info.yearReleased) {
                res.status(400).json({ error: 'You need to include a yearReleased' });
                return;
            }
            if (typeof requestBody.info.director !== 'string') {
                res.status(400).json({ error: 'Director needs to be a string' });
                return;
            }
            if (typeof requestBody.info.yearReleased !== 'number') {
                res.status(400).json({ error: 'yearReleased needs to be a string' });
                return;
            }
            if (Object.keys(requestBody.info).length !== 2) {
                res.status(400).json({ error: 'There needs to be 2 key value pairs in the info object' });
                return;
            }
            updatedMovieObj.info = requestBody.info;
        }
        if (requestBody.plot && requestBody.plot !== oldMovie.plot) {
            if (typeof requestBody.plot !== 'string') {
                res.status(400).json({ error: 'Plot must be a string' });
                return;
            }
            updatedMovieObj.plot = requestBody.plot;
        }
        if (requestBody.rating && requestBody.rating !== oldMovie.rating) {
            if (typeof requestBody.rating !== 'number') {
                res.status(400).json({ error: 'Rating must be a number' });
                return;
            }
            if (requestBody.rating < 0 || requestBody.rating > 5) {
                res.status(400).json({ error: 'Rating must be a number between 0 and 5, inclusive.' });
                return;
            }
            updatedMovieObj.rating = requestBody.rating;
        }
    } catch (e) {
        res.status(404).json({ error: 'Movie not found' });
    }

    if (Object.keys(updatedMovieObj).length !== 0) {
        try {
            const updatedMovie = await movieData.updateMovie(req.params.id, updatedMovieObj);
            res.status(200).json(updatedMovie);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    } else {
        res.status(400).json({
            error: 'No categories have been changed from their previous state, so there is nothing to update',
        });
    }
});

router.post('/:id/comments', async (req, res) => {
    let commentInfo = req.body;

    if (!commentInfo) {
        res.status(400).json({ error: 'You must provide data to add a comment' });
        return;
    }
    if (!commentInfo.name) {
        res.status(400).json({ error: 'You must provide a name so other users know who commented' });
        return;
    }
    if (!commentInfo.comment) {
        res.status(400).json({ error: 'You must provide a comment if you want to comment on this movie' });
        return;
    }
    if (typeof commentInfo.name !== 'string' || typeof commentInfo.comment !== 'string') {
        res.status(400).json({ error: 'Name and comment must both be strings' });
        return;
    }
    if (Object.keys(commentInfo).length !== 2) {
        res.status(400).json({ error: 'There must be 2 key value pairs in the comment object' });
        return;
    }

    try {
        const { name, comment } = commentInfo;
        const newComment = await movieData.addComment(req.params.id, name, comment);
        res.status(200).json(newComment);
    } catch (e) {
        res.status(500).json({ error: 'Something has gone wrong' });
    }
});

router.delete('/:movieId/:commentId', async (req, res) => {
    try {
        await movieData.getMovieByID(req.params.movieId);
    } catch (e) {
        res.status(404).json({ error: 'Movie not found' });
        return;
    }

    try {
        await movieData.deleteComment(req.params.movieId, req.params.commentId);
        res.sendStatus(200);
    } catch (e) {
        if (e === 'That commentId does not exist') {
            return res.status(404).json({ error: e });
        }
        res.status(500).json({ error: 'Something has gone wrong' });
    }
});

module.exports = router;
