const axios = require('axios');
const { stripHtml } = require('string-strip-html');

async function getShows() {
    let allShows;

    try {
        allShows = await axios.get('http://api.tvmaze.com/shows');
        return allShows.data;
    } catch (e) {
        return e;
    }
}

async function getShowById(id) {
    if (!id) throw 'You must provide an id';
    id = parseInt(id);
    if (typeof id !== 'number') throw 'id must be a number';
    if (arguments.length !== 1) throw 'There should only be one argument provided: id';
    if (id <= 0) throw 'Id must be a number greater than 0';

    let show;

    try {
        show = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        if (show === undefined) throw 'A show with that id does not exist';
    } catch (e) {
        return e;
    }

    if (show.data.summary) {
        // For some reason, all the summaries in this API have HTML tags INSIDE the strings....so I decided to get rid of that ugliness here:
        show.data.summary = stripHtml(show.data.summary).result;
    }
    return show.data;
}

async function getShowBySearch(searchTerm) {
    if (!searchTerm) throw 'You must provide a search term';
    if (arguments.length !== 1) throw 'There should only be one argument provided: searchTerm';

    let showsList;

    try {
        showsList = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
        if (showsList === undefined) throw 'No shows available';
        return showsList.data;
    } catch (e) {
        return e;
    }
}

module.exports = { getShows, getShowById, getShowBySearch };
