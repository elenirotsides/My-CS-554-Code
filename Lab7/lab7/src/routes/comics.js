const express = require('express');
const router = express.Router();
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');
const md5 = require('blueimp-md5');
const secrets = require('../secrets.json');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/:id', async (req, res) => {
    if (req.params.id <= 0) {
        return res.status(404).json({ error: 'Comic does not exist' });
    }

    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${req.params.id}`;
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    let cacheExists;
    try {
        cacheExists = await client.existsAsync(`comic${req.params.id}`);
        res.status(200);
    } catch (e) {
        res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
    }

    if (cacheExists) {
        let cache = await client.getAsync(`comic${req.params.id}`);

        return res.status(200).json(JSON.parse(cache));
    } else {
        let storeChar;

        try {
            const { data: comicData } = await axios.get(url);

            if (comicData['isAxiosError']) {
                return res.status(404).json({ error: 'Comic does not exist' });
            }

            storeChar = comicData.data.results;
            res.status(200);
        } catch (e) {
            return res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
        }

        try {
            await client.setAsync(`comic${req.params.id}`, JSON.stringify(storeChar[0]));
        } catch (e) {
            return res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
        }

        return res.json(storeChar[0]);
    }
});

router.get('/page/:page', async (req, res) => {
    if (req.params.page < 0) {
        return res.status(404).json({ error: 'That page does not exist' });
    }

    const publickey = secrets.MARVEL_PUBLIC_KEY;
    const privatekey = secrets.MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    let cacheExists;
    try {
        cacheExists = await client.existsAsync(`comicsPage${req.params.page}`);
        res.status(200);
    } catch (e) {
        res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
    }

    if (cacheExists) {
        let cache = await client.getAsync(`comicsPage${req.params.page}`);

        return res.status(200).json(JSON.parse(cache));
    } else {
        let storePage;

        try {
            const { data: pageData } = await axios.get(url + `&offset=${req.params.page * 20}`);

            if (pageData['isAxiosError']) {
                return res.status(404).json({ error: 'Page does not exist' }); //fix this
            }

            storePage = pageData.data;
            res.status(200);
        } catch (e) {
            return res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
        }

        try {
            await client.setAsync(`comicsPage${req.params.page}`, JSON.stringify(storePage));
        } catch (e) {
            return res.status(500).json({ error: 'Error: 500 Something has gone wrong...please try again.' });
        }

        return res.json({ data: storePage });
    }
});

module.exports = router;
