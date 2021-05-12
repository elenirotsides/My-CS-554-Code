const getCharacterData = (badRequest, loading, char) => ({
    type: 'GET_CHAR_DATA',
    payload: {
        badRequest: badRequest,
        loading: loading,
        char: char,
    },
});

const characterList = (total, badRequest, loading, lis) => ({
    type: 'SET_CHAR_LIST',
    payload: {
        total: total,
        badRequest: badRequest,
        loading: loading,
        lis: lis,
    },
});

const getComicData = (badRequest, loading, comic) => ({
    type: 'GET_COMIC_DATA',
    payload: {
        badRequest: badRequest,
        loading: loading,
        comic: comic,
    },
});

const comicList = (total, badRequest, loading, lis) => ({
    type: 'SET_COMIC_LIST',
    payload: {
        total: total,
        badRequest: badRequest,
        loading: loading,
        lis: lis,
    },
});

const getSeriesData = (badRequest, loading, series) => ({
    type: 'GET_SERIES_DATA',
    payload: {
        badRequest: badRequest,
        loading: loading,
        series: series,
    },
});

const seriesList = (total, badRequest, loading, lis) => ({
    type: 'SET_SERIES_LIST',
    payload: {
        total: total,
        badRequest: badRequest,
        loading: loading,
        lis: lis,
    },
});

module.exports = { getCharacterData, characterList, comicList, getComicData, getSeriesData, seriesList };
