<template>
    <div v-if="this.loading">
        <br />
        <h2>Loading...</h2>
    </div>
    <div v-else-if="this.badRequest">
        <br />
        <h2>The series you are looking for does not exist...please try a different one.</h2>
    </div>
    <div v-else class="center detailPage">
        <br />
        <img :src="`${this.series.thumbnail.path}/portrait_incredible.${this.series.thumbnail.extension}`" :alt="`${this.series.title}`" />
        <h1>{{ this.series.title }}</h1>
        <div v-if="this.series.description">
            <span class="title">Description:</span>
            <p>{{ this.series.description }}</p>
        </div>
        <div v-else>
            <span class="title">Description:</span>
            <p>No description</p>
        </div>
        <div v-if="this.series.characters.available">
            <span class="title">Characters:</span>
            <p>{{ this.series.characters.available }}</p>
        </div>
        <div v-else>
            <span class="title">Characters:</span>
            <p>No characters</p>
        </div>
        <div v-if="this.series.comics.available">
            <span class="title">Comics:</span>
            <p>{{ this.series.comics.available }}</p>
        </div>
        <div v-else>
            <span class="title">Comics:</span>
            <p>No comics</p>
        </div>
        <div v-if="this.series.stories.available">
            <span class="title">Stories:</span>
            <p>{{ this.series.stories.available }}</p>
        </div>
        <div v-else>
            <span class="title">Stories:</span>
            <p>No stories</p>
        </div>
        <div v-if="this.series.events.available">
            <span class="title">Events:</span>
            <p>{{ this.series.events.available }}</p>
        </div>
        <div v-else>
            <span class="title">Events:</span>
            <p>No events</p>
        </div>
        <nav>
            <router-link :to="{ name: 'seriesList', params: { page: 0 } }" type="button" class="pagelink"
                >Click here to go back to the main series page</router-link
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
    name: 'Series',
    data() {
        return {
            id: this.$route.params.id,
            series: [],
            loading: false,
            badRequest: false,
        };
    },
    methods: {
        async getSeries(id) {
            this.loading = true;
            this.badRequest = false;

            const publickey = secrets.MARVEL_PUBLIC_KEY;
            const privatekey = secrets.MARVEL_PRIVATE_KEY;
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = `https://gateway.marvel.com:443/v1/public/series/${id}`;
            const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

            try {
                const { data } = await axios.get(url);
                this.loading = false;
                this.badRequest = false;
                this.series = data.data.results[0];
            } catch (e) {
                console.log(e);
                this.loading = false;
                this.badRequest = true;
            }
        },
    },
    created() {
        this.getSeries(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getSeries(this.$route.params.id);
        },
    },
};
</script>

<style></style>
