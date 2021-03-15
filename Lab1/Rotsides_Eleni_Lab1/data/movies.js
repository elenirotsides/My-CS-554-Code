const mongoCollections = require('../mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

async function getMovies(skip, take) {
    if (typeof skip !== 'number' || typeof take !== 'number') throw 'Skip and take must be numbers';
    if (skip < 0 || take < 0) throw 'Skip and take must be positive numbers';
    if (arguments.length !== 2) throw 'There must be two arguments';

    const movieCollection = await movies();

    if (take > 100) {
        const movieList = await movieCollection.find({}).skip(skip).limit(100).toArray();
        if (movieList.length === 0) throw 'Collection is empty, no movies to display';
        return movieList;
    }
    if (take === 0) {
        const movieList = await movieCollection.find({}).skip(skip).limit(20).toArray();
        if (movieList.length === 0) throw 'Collection is empty, no movies to display';
        return movieList;
    } else {
        const movieList = await movieCollection.find({}).skip(skip).limit(take).toArray();
        if (movieList.length === 0) throw 'Collection is empty, no movies to display.';

        return movieList;
    }
}

async function getMovieByID(id) {
    if (!id) throw 'Please provide ID';
    if (arguments.length !== 1) throw 'Incorrect number of arguments';

    const movieCollection = await movies();

    if (typeof id === 'string') {
        const objId = ObjectId.createFromHexString(id);
        const movie = await movieCollection.findOne({ _id: objId });
        if (movie === null) throw 'Sorry, no movie exists with that ID';
        return movie;
    } else {
        const movie = await movieCollection.findOne({ _id: id });
        if (movie === null) throw 'Sorry, no movie exists with that ID';
        return movie;
    }
}

async function addMovie(title, cast, info, plot, rating) {
    if (!title) throw "You must supply the movie's title";
    if (!cast) throw 'You must supply an array of objects with cast information in the form: [{firstName: string, lastName: string}, ........]';
    if (!info) throw 'You must supply an object containing information about the movie in the form: {director: string, yearReleased: number}';
    if (!plot) throw 'You must provide a plot';
    if (!rating) throw 'You must supply a rating';
    if (typeof title !== 'string') throw 'Title must be a string';
    if (!Array.isArray(cast)) throw 'Cast must be an array';
    for (let i = 0; i < cast.length; i++) {
        if (typeof cast[i] !== 'object') throw 'Cast needs to be an array of objects';
        if (!cast[i].firstName || !cast[i].lastName) throw 'You need to include a firstName and a lastName';
        if (Object.keys(cast[i]).length !== 2) throw 'There needs to be two key value pairs in each object';
        if (typeof cast[i].firstName !== 'string' || typeof cast[i].lastName !== 'string') {
            throw 'firstName and lastName must be strings';
        }
    }
    if (typeof info !== 'object' || info === null) throw 'Info must be an object, and not null either';
    if (!info.director) throw 'You need to include a director';
    if (!info.yearReleased) throw 'You need to include a yearReleased';
    if (typeof info.director !== 'string') throw 'Director needs to be a string';
    if (typeof info.yearReleased !== 'number') throw 'yearReleased needs to be a string';
    if (Object.keys(info).length !== 2) throw 'There needs to be 2 key value pairs in the info object';
    if (typeof plot !== 'string') throw 'Plot must be a string';
    if (typeof rating !== 'number') throw 'Rating must be a number';
    if (rating < 0 || rating > 5) throw 'Rating must be a number in the range 0-5, inclusive';
    if (arguments.length !== 5) throw 'All the arguments were not provided';

    const movieCollection = await movies();

    let newMovie = {
        title: title,
        cast: cast,
        info: info,
        plot: plot,
        rating: rating,
        comments: [],
    };

    const insertInfo = await movieCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Error adding movie';

    const newID = insertInfo.insertedId;

    return await this.getMovieByID(newID);
}

async function updateMovie(movieId, updatedMovie) {
    if (!movieId) throw 'You must supply a movieId';
    if (!updatedMovie) throw 'You must supply an updatedMovie obj';
    if (arguments.length !== 2) throw 'You must supply 2 arguments';

    const movieCollection = await movies();

    const updatedMovieObj = {};

    if (updatedMovie.title) {
        if (typeof updatedMovie.title !== 'string') throw 'Title must be a string';
        updatedMovieObj.title = updatedMovie.title;
    }
    if (updatedMovie.cast) {
        if (!Array.isArray(updatedMovie.cast)) throw 'Cast must be an array';
        for (let i = 0; i < updatedMovie.cast.length; i++) {
            if (typeof updatedMovie.cast[i] !== 'object') throw 'Cast needs to be an array of objects';
            if (!updatedMovie.cast[i].firstName || !updatedMovie.cast[i].lastName) throw 'You need to include a firstName and a lastName';
            if (Object.keys(updatedMovie.cast[i]).length !== 2) throw 'There needs to be two key value pairs in each object';
            if (typeof updatedMovie.cast[i].firstName !== 'string' || typeof updatedMovie.cast[i].lastName !== 'string') {
                throw 'firstName and lastName must be strings';
            }
        }
        updatedMovieObj.cast = updatedMovie.cast;
    }
    if (updatedMovie.info) {
        if (typeof updatedMovie.info !== 'object') throw 'Info must be an object';
        if (typeof updatedMovie.info.director !== 'string') throw 'Director must be a string';
        if (typeof updatedMovie.info.yearReleased !== 'number') throw 'yearReleased must be a number';
        if (!updatedMovie.info.director) throw 'You need to include a director';
        if (!updatedMovie.info.yearReleased) throw 'You need to include a yearReleased';
        if (Object.keys(updatedMovie.info).length !== 2) throw 'There need to be two key value pairs in the info object';
        updatedMovieObj.info = updatedMovie.info;
    }
    if (updatedMovie.plot) {
        if (typeof updatedMovie.plot !== 'string') throw 'Plot must be a string';
        updatedMovieObj.plot = updatedMovie.plot;
    }
    if (updatedMovie.rating) {
        if (typeof updatedMovie.rating !== 'number') throw 'Rating must be a number';
        if (updatedMovie.rating < 0 || updatedMovie.rating > 5) throw 'Rating must be a number in the range 0-5, inclusive';
        updatedMovieObj.rating = updatedMovie.rating;
    }

    if (typeof movieId === 'string') {
        const objId = ObjectId.createFromHexString(movieId);
        const updatedInfo = await movieCollection.updateOne({ _id: objId }, { $set: updatedMovieObj });
        if (updatedInfo.modifiedCount === 0) throw 'Could not update movie';
        return updatedMovieObj;
    } else {
        const updatedInfo = await movieCollection.updateOne({ _id: movieId }, { $set: updatedMovieObj });
        if (updatedInfo.modifiedCount === 0) throw 'Could not update movie';
        return updatedMovieObj;
    }
}

async function updateCommentArray(movieId, updatedComment) {
    if (!movieId) throw 'You must supply a movieId';
    if (!updatedComment) throw 'You must supply an updatedComment obj';
    if (arguments.length !== 2) throw 'You must supply 2 arguments';

    const movieCollection = await movies();

    const updatedCommentObj = {};

    if (updatedComment.comments) {
        if (!Array.isArray(updatedComment.comments)) throw 'Comments must be an array';
        for (let i = 0; i < updatedComment.comments.length; i++) {
            if (typeof updatedComment.comments[i].name !== 'string' || typeof updatedComment.comments[i].comment !== 'string') {
                throw 'firstName and lastName must be strings';
            }
        }
        updatedCommentObj.comments = updatedComment.comments;
    }

    if (typeof movieId === 'string') {
        const objId = ObjectId.createFromHexString(movieId);
        const updatedInfo = await movieCollection.updateOne({ _id: objId }, { $set: updatedCommentObj });
        if (updatedInfo.modifiedCount === 0) throw 'Could not update movie';
        return updatedCommentObj;
    } else {
        const updatedInfo = await movieCollection.updateOne({ _id: movieId }, { $set: updatedCommentObj });
        if (updatedInfo.modifiedCount === 0) throw 'Could not update movie';
        return updatedCommentObj;
    }
}

async function addComment(movieId, name, comment) {
    if (!movieId) throw 'You must supply a movieId';
    if (!name) throw 'You must supply a name';
    if (!comment) throw 'You must supply a comment';
    if (typeof name !== 'string' || typeof comment !== 'string') throw 'Name and comment must be strings';
    if (arguments.length !== 3) throw 'You need to supply all the arguments';

    let comments = (await getMovieByID(movieId)).comments;
    comments = comments.concat([{ _id: new ObjectId(), name: name, comment: comment }]);

    await updateCommentArray(movieId, { comments: comments });
    return await getMovieByID(movieId);
}

async function deleteComment(movieId, commentId) {
    if (!movieId) throw 'You must provide the movieId';
    if (!commentId) throw 'You must provide the commentId';
    if (arguments.length !== 2) throw 'You must provide all the arguments';

    const movieCollection = await movies();

    if (typeof movieId === 'string' && typeof commentId === 'string') {
        const convertedMovieId = ObjectId.createFromHexString(movieId);
        const convertedCommentId = ObjectId.createFromHexString(commentId);
        const updateMovie = await movieCollection.updateOne({ _id: convertedMovieId }, { $pull: { comments: { _id: convertedCommentId } } });
        if (!updateMovie.matchedCount && !updateMovie.modifiedCount) throw 'Deletion failed';
        if (updateMovie.modifiedCount === 0) throw 'That commentId does not exist';
        return;
    } else if (typeof commentId === 'string') {
        const convertedCommentId = ObjectId.createFromHexString(commentId);
        const updateMovie = await movieCollection.updateOne({ _id: movieId }, { $pull: { comments: { _id: convertedCommentId } } });
        if (!updateMovie.matchedCount && !updateMovie.modifiedCount) throw 'Deletion failed';
        if (updateMovie.modifiedCount === 0) throw 'That commentId does not exist';
        return;
    } else if (typeof movieId === 'string') {
        const convertedMovieId = ObjectId.createFromHexString(movieId);
        const updateMovie = await movieCollection.updateOne({ _id: convertedMovieId }, { $pull: { comments: { _id: commentId } } });
        if (!updateMovie.matchedCount && !updateMovie.modifiedCount) throw 'Deletion failed';
        if (updateMovie.modifiedCount === 0) throw 'That commentId does not exist';
        return;
    } else {
        const updateMovie = await movieCollection.updateOne({ _id: movieId }, { $pull: { comments: { _id: commentId } } });
        if (!updateMovie.matchedCount && !updateMovie.modifiedCount) throw 'Deletion failed';
        if (updateMovie.modifiedCount === 0) throw 'That commentId does not exist';
        return;
    }
}

module.exports = { getMovies, getMovieByID, updateMovie, addMovie, addComment, deleteComment };
