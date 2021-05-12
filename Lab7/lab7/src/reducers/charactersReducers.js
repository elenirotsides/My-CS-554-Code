const initialState = {
    total: null,
    badRequest: false,
    loading: false,
    lis: null,
    char: null,
};

const charactersReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CHAR_LIST':
            return {
                total: payload.total,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: payload.lis,
                char: null,
            };
        case 'GET_CHAR_DATA':
            return {
                total: null,
                badRequest: payload.badRequest,
                loading: payload.loading,
                lis: null,
                char: payload.char,
            };
        default:
            return state;
    }
};

export default charactersReducers;
