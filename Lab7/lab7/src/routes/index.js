const charactersRoute = require('./characters');
const comicsRoute = require('./comics');
const seriesRoute = require('./series');

const constructorMethod = (app) => {
    app.use('/characters', charactersRoute);
    app.use('/comics', comicsRoute);
    app.use('/series', seriesRoute);
};

module.exports = constructorMethod;
