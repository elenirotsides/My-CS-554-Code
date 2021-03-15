const moviesRoute = require('./movies');

const constructorMethod = (app) => {
    app.use('/api/movies', moviesRoute);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'The page you requested does not exist' });
    });
};

module.exports = constructorMethod;
