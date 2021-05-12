<template>
    <b-container fluid>
        <br />
        <nav v-if="this.loading === false && this.badRequest === false">
            <router-link
                v-if="this.page > 0"
                :to="{ name: 'seriesList', params: { page: parseFloat(this.$route.params.page) - 1 } }"
                class="pagelink"
            >
                Previous Page
            </router-link>
            <router-link
                v-if="this.page < calcLastPage()"
                :to="{ name: 'seriesList', params: { page: parseFloat(this.$route.params.page) + 1 } }"
                class="pagelink"
                >Next Page</router-link
            >
        </nav>
        <router-view />
        <br />
        <h2 v-if="this.loading">Loading...</h2>
        <h2 v-else-if="this.badRequest || parseFloat(this.$route.params.page) > calcLastPage()">
            The page you are looking for does not exist...please try again
        </h2>
        <b-row v-else>
            <b-col cols="6" md="2" v-for="(serie, index) in series" :key="index">
                <div>
                    <h1></h1>
                    <h2></h2>
                    <h3></h3>
                    <router-link :to="{ name: 'series', params: { id: serie.id } }">
                        <b-card-img
                            :src="`${serie.thumbnail.path}/portrait_incredible.${serie.thumbnail.extension}`"
                            :alt="`${serie.title}`"
                        ></b-card-img>
                        <b-card :title="`${serie.title}`" class="mb-2 name"></b-card>
                    </router-link>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
import secrets from '../secrets.json';
const md5 = require('blueimp-md5');

export default {
    name: 'SeriesList',
    data() {
        return {
            page: 0,
            series: [],
            loading: false,
            badRequest: false,
            total: null,
        };
    },
    methods: {
        calcLastPage() {
            const lastPage = Math.floor(this.total / 20);
            return lastPage;
        },
        async getSeriesList(page) {
            this.loading = true;
            this.badRequest = false;

            const publickey = secrets.MARVEL_PUBLIC_KEY;
            const privatekey = secrets.MARVEL_PRIVATE_KEY;
            const ts = new Date().getTime();
            const stringToHash = ts + privatekey + publickey;
            const hash = md5(stringToHash);
            const baseUrl = 'https://gateway.marvel.com:443/v1/public/series';
            const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

            try {
                const { data } = await axios.get(url + `&offset=${page * 20}`);

                if (data.data.results.length === 0) {
                    this.badRequest = true;
                    this.loading = false;
                    return;
                }

                this.badRequest = false;
                this.loading = false;

                this.series = data.data.results;
                this.total = data.data.total;
                this.page = page;
            } catch (e) {
                console.log(e);
                this.loading = false;
                this.badRequest = true;
            }
        },
    },
    created() {
        this.getSeriesList(this.$route.params.page);
    },
    watch: {
        $route() {
            this.getSeriesList(this.$route.params.page);
            this.page = this.$route.params.page;
        },
    },
};
</script>

<style scoped>
.name {
    color: #9c6969;
}
</style>
