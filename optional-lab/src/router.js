import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import CharacterList from './components/CharactersList.vue';
import ComicsList from './components/ComicsList.vue';
import SeriesList from './components/SeriesList.vue';
import Characters from './components/Characters.vue';
import Comics from './components/Comics.vue';
import Series from './components/Series.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/characters/page/:page',
            name: 'charactersList',
            component: CharacterList,
        },
        {
            path: '/comics/page/:page',
            name: 'comicsList',
            component: ComicsList,
        },
        {
            path: '/series/page/:page',
            name: 'seriesList',
            component: SeriesList,
        },
        {
            path: '/characters/:id',
            name: 'characters',
            component: Characters,
        },
        {
            path: '/comics/:id',
            name: 'comics',
            component: Comics,
        },
        {
            path: '/series/:id',
            name: 'series',
            component: Series,
        },
    ],
});
