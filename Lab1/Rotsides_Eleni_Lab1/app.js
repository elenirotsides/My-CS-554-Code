const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// First middleware
let totalRequests = 0;

app.use(async (req, res, next) => {
    totalRequests++;
    console.log('------------------------------------------------------------------------------------------------');
    console.log(`Total requests made to the server: ${totalRequests}`);

    next();
});

// Second middleware
app.use(async (req, res, next) => {
    console.log('The request body:');
    console.log(req.body);
    console.log(`The URL path being requested: ${req.protocol}://${req.hostname}:3000${req.originalUrl}`);
    console.log(`The HTTP verb being used to make the request: ${req.method}`);

    next();
});

// Third middleware
const urlAccessed = {};

app.use(async (req, res, next) => {
    let url = `${req.protocol}://${req.hostname}:3000${req.originalUrl}`;

    if (!urlAccessed[url]) {
        urlAccessed[url] = 0;
    }
    urlAccessed[url]++;

    console.log(`${url} has been accessed ${urlAccessed[url]} time(s).`);
    console.log('------------------------------------------------------------------------------------------------');

    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log('Now connected to the server!');
    console.log('Routes will be running on http://localhost:3000');
    console.log();
});
