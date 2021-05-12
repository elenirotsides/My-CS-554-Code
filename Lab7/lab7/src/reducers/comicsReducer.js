const initialState = {
    total: null,
    badRequest: false,
    loading: false,
    lis: null,
    comic: null,
};

const comicsReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_COMIC_LIST':
            return {
                total: payload.total,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: payload.lis,
                comic: null,
            };
        case 'GET_COMIC_DATA':
            return {
                total: null,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: null,
                comic: payload.comic,
            };
        default:
            return state;
    }
};

export default comicsReducers;
