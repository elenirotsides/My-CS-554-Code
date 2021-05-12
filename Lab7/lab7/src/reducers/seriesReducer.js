const initialState = {
    total: null,
    badRequest: false,
    loading: false,
    lis: null,
    series: null,
};

const seriesReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_SERIES_LIST':
            return {
                total: payload.total,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: payload.lis,
                series: null,
            };
        case 'GET_SERIES_DATA':
            return {
                total: null,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: null,
                series: payload.series,
            };
        default:
            return state;
    }
};

export default seriesReducers;
