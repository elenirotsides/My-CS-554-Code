<template>
    <div v-if="this.loading">
        <br />
        <h2>Loading...</h2>
    </div>
    <div v-else-if="this.badRequest">
        <br />
        <h2>The character you are looking for does not exist...please try a different one.</h2>
    </div>
    <div v-else class="center detailPage">
        <br />
        <img :src="`${this.character.thumbnail.path}/portrait_incredible.${this.character.thumbnail.extension}`" :alt="`${this.character.name}`" />
        <h1>{{ this.character.name }}</h1>
        <div v-if="this.character.description">
            <span class="title">Description:</span>
            <p>{{ this.character.description }}</p>
        </div>
        <div v-else>
            <span class="title">Description:</span>
            <p>No description</p>
        </div>
        <div v-if="this.character.comics.available">
            <span class="title">Comics:</span>
            <p>{{ this.character.comics.available }}</p>
        </div>
        <div v-else>
            <span class="title">Comics:</span>
            <p>No comics</p>
        </div>
        <div v-if="this.character.series.available">
            <span class="title">Series:</span>
            <p>{{ this.character.series.available }}</p>
        </div>
        <div v-else>
            <span class="title">Series:</span>
            <p>No series</p>
        </div>
        <div v-if="this.character.stories.available">
            <span class="title">Stories:</span>
            <p>{{ this.character.stories.available }}</p>
        </div>
        <div v-else>
            <span class="title">Stories:</span>
            <p>No stories</p>
        </div>
        <div v-if="this.character.events.available">
            <span class="title">Events:</span>
            <p>{{ this.character.events.available }}</p>
        </div>
        <div v-else>
            <span class="title">Events:</span>
            <p>No events</p>
        </div>
        <nav>
            <router-link :to="{ name: 'charactersList', params: { page: 0 } }" type="button" class="pagelink"
                >Click here to go back to the main character page</router-link
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
    name: 'Characters',
    data() {
        return {
            id: this.$route.params.id,
            character: [],
            loading: false,
            badRequest: false,
        };
    },
    methods: {
        async getCharacter(id) {
            this.loading = true;
            this.badRequest = false;

            const publickey = secrets.MARVEL_PUBLIC_KEY;
            const privatekey = secrets.MARVEL_PRIVATE_KEY;
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}`;
            const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

            try {
                const { data } = await axios.get(url);
                this.loading = false;
                this.badRequest = false;
                this.character = data.data.results[0];
            } catch (e) {
                console.log(e);
                this.loading = false;
                this.badRequest = true;
            }
        },
    },
    created() {
        this.getCharacter(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getCharacter(this.$route.params.id);
        },
    },
};
</script>

<style></style>
