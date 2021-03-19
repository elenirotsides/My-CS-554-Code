const express = require('express');
const router = express.Router();
const showsData = require('../data/shows');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/', async (req, res) => {
    let cacheExists;
    try {
        cacheExists = await client.existsAsync('showList');
        res.status(200);
    } catch (e) {
        res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
    }

    if (cacheExists) {
        let cache = await client.getAsync('showList');
        res.status(200).send(cache);
    } else {
        let showListData;

        try {
            showListData = await showsData.getShows();
            res.status(200);
        } catch (e) {
            return res.status(404).render('../views/partials/error', { title: 'Error!', error: 'Looks like there are no shows to display!' });
        }

        try {
            res.render('../views/partials/showsList', showListData, async function (err, html) {
                await client.setAsync('showList', html);
                res.status(200).send(html);
            });
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: 'Uh oh! Looks like something went wrong!' });
        }
    }
});

router.get('/show/:id', async (req, res) => {
    if (req.params.id <= 0) {
        return res.status(400).render('../views/partials/error', { title: 'Error!', error: 'id must be greater than 0' });
    }

    let cacheExists;
    try {
        cacheExists = await client.existsAsync(`show${req.params.id}`);
        res.status(200);
    } catch (e) {
        res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
    }

    if (cacheExists) {
        let cache = await client.getAsync(`show${req.params.id}`);
        res.status(200).send(cache);
    } else {
        let showData;

        try {
            showData = await showsData.getShowById(req.params.id);
            if (showData['isAxiosError']) {
                return res.status(404).render('../views/partials/error', { title: 'Error!', error: showData.message });
            }
            res.status(200);
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
        }

        try {
            res.render('../views/partials/show', showData, async function (err, html) {
                await client.setAsync(`show${req.params.id}`, html);
                // console.log('im inside the route');
                // console.log(showListData);
                res.status(200).send(html);
            });
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: 'Uh oh! Looks like something went wrong!' });
        }
    }
});

router.post('/search', async (req, res) => {
    input = req.body.searchTerm;

    if (!input.trim()) {
        return res.status(400).render('../views/partials/error', { error: 'Search Term cannot be empty!' });
    }

    let sortedSetExists;
    try {
        sortedSetExists = await client.zscoreAsync('search', input);
        res.status(200);
    } catch (e) {
        return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
    }

    if (!sortedSetExists) {
        try {
            await client.zaddAsync('search', 1, input);
            res.status(200);
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
        }
    } else {
        try {
            await client.zincrbyAsync('search', 1, input);
            res.status(200);
        } catch {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
        }
    }

    let cacheExists;
    try {
        cacheExists = await client.existsAsync(`search${input}`);
        res.status(200);
    } catch (e) {
        res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
    }

    if (cacheExists) {
        let cache = await client.getAsync(`search${input}`);
        res.status(200).send(cache);
    } else {
        let searchData;
        try {
            searchData = await showsData.getShowBySearch(input);
            if (searchData['isAxiosError']) {
                return res.status(404).render('../views/partials/error', { title: 'Error!', error: 'No shows exist with that keyword' });
            }
            res.status(200);
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
        }

        try {
            res.render('../views/partials/searchShows', searchData, async function (err, html) {
                await client.setAsync(`search${input}`, html);
                res.status(200).send(html);
            });
        } catch (e) {
            return res.status(500).render('../views/partials/error', { title: 'Error!', error: 'Uh oh! Looks like something went wrong!' });
        }
    }
});

router.get('/popularsearches', async (req, res) => {
    let popularSearches;
    try {
        popularSearches = await client.zrevrangeAsync('search', 0, 10);
        res.status(200);
    } catch (e) {
        return res.status(500).render('../views/partials/error', { title: 'Error!', error: e });
    }

    if (popularSearches.length === 0) {
        return res.status(404).render('../views/partials/popularSearches', { empty: true });
    }

    try {
        res.status(200).render('../views/partials/popularSearches', { popular: popularSearches, empty: false });
    } catch (e) {
        return res.status(500).render('../views/partials/error', { title: 'Error!', error: 'Uh oh! Looks like something went wrong!' });
    }
});

module.exports = router;
