const path = require('path');

const constructorMethod = (app) => {
    app.get('/', async (req, res) => {
        try {
            res.sendFile(path.resolve('public/index.html'));
            res.status(200);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Error 404: Resource not found' });
    });
};
module.exports = constructorMethod;
