const showsRoute = require('./shows');

const constructorMethod = (app) => {
    app.use('/', showsRoute);

    app.use('*', (req, res) => {
        res.status(404).render('../views/partials/error', { title: 'Error!', error: 'ERROR 404: The page you requested does not exist' });
    });
};

module.exports = constructorMethod;
