const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const configRoutes = require('./routes');

const exphbs = require('express-handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    partialsDir: ['views/partials/'],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
