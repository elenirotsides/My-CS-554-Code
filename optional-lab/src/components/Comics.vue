<template>
    <div v-if="this.loading">
        <br />
        <h2>Loading...</h2>
    </div>
    <div v-else-if="this.badRequest">
        <br />
        <h2>The comic you are looking for does not exist...please try a different one.</h2>
    </div>
    <div v-else class="center detailPage">
        <br />
        <img :src="`${this.comic.thumbnail.path}/portrait_incredible.${this.comic.thumbnail.extension}`" :alt="`${this.comic.title}`" />
        <h1>{{ this.comic.title }}</h1>
        <div v-if="this.comic.description">
            <span class="title">Description:</span>
            <p>{{ this.comic.description }}</p>
        </div>
        <div v-else>
            <span class="title">Description:</span>
            <p>No description</p>
        </div>
        <div v-if="this.comic.characters.available">
            <span class="title">Characters:</span>
            <p>{{ this.comic.characters.available }}</p>
        </div>
        <div v-else>
            <span class="title">Characters:</span>
            <p>No characters</p>
        </div>
        <div v-if="this.comic.series.available">
            <span class="title">Series:</span>
            <p>{{ this.comic.series.available }}</p>
        </div>
        <div v-else>
            <span class="title">Series:</span>
            <p>No series</p>
        </div>
        <div v-if="this.comic.stories.available">
            <span class="title">Stories:</span>
            <p>{{ this.comic.stories.available }}</p>
        </div>
        <div v-else>
            <span class="title">Stories:</span>
            <p>No stories</p>
        </div>
        <div v-if="this.comic.events.available">
            <span class="title">Events:</span>
            <p>{{ this.comic.events.available }}</p>
        </div>
        <div v-else>
            <span class="title">Events:</span>
            <p>No events</p>
        </div>
        <nav>
            <router-link :to="{ name: 'comicsList', params: { page: 0 } }" type="button" class="pagelink"
                >Click here to go back to the main comic page</router-link
            >
        </nav>
        <router-view />
    </div>
</template>

<script>
import axios from 'axios';
import secrets from '../secrets.json';
const md5 = require('blueimp-md5');

export default {
    name: 'Comics',
    data() {
        return {
            id: this.$route.params.id,
            comic: [],
            loading: false,
            badRequest: false,
        };
    },
    methods: {
        async getComic(id) {
            this.loading = true;
            this.badRequest = false;

            const publickey = secrets.MARVEL_PUBLIC_KEY;
            const privatekey = secrets.MARVEL_PRIVATE_KEY;
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${id}`;
            const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

            try {
                const { data } = await axios.get(url);
                this.loading = false;
                this.badRequest = false;
                this.comic = data.data.results[0];
            } catch (e) {
                console.log(e);
                this.loading = false;
                this.badRequest = true;
            }
        },
    },
    created() {
        this.getComic(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getComic(this.$route.params.id);
        },
    },
};
</script>

<style></style>
