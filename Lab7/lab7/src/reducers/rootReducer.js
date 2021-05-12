import { combineReducers } from 'redux';
import charactersReducers from './charactersReducers';
import comicsReducer from './comicsReducer';
import seriesReducer from './seriesReducer';

const rootReducer = combineReducers({
    characters: charactersReducers,
    comics: comicsReducer,
    series: seriesReducer,
});

export default rootReducer;
