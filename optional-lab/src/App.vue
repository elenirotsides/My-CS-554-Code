<template>
    <div class="App">
        <header class="App-header">
            <img src="./assets/marvel.jpeg" class="App-logo" alt="logo" />
            <br />
            <br />
            <nav>
                <router-link class="showlink" to="/">Home</router-link>
                <router-link class="showlink" :to="{ name: 'charactersList', params: { page: 0 } }">Characters</router-link>
                <router-link class="showlink" :to="{ name: 'comicsList', params: { page: 0 } }">Comics</router-link>
                <router-link class="showlink" :to="{ name: 'seriesList', params: { page: 0 } }">Series</router-link>
            </nav>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
.App {
    text-align: center;
}
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}
.App-logo {
    height: 100px;
}

.App-header {
    background-color: #a87c7c;
    height: 180px;
    padding: 20px;
    color: #222;
}

.hometext {
    max-width: 60%;
    font-size: x-large;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.detailPage {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.showlink {
    padding: 0.4rem 0.8rem;
    background-color: white;
    border-radius: 3px;
    color: #9c6969;
    text-decoration: none !important;
    margin: 5px;
}

.pagelink:hover {
    background-color: transparent;
    color: #9c6969;
    border: 2px solid #9c6969;
}

.pagelink {
    padding: 0.4rem 0.8rem;
    background-color: #9c6969;
    border-radius: 3px;
    color: white;
    text-decoration: none !important;
    margin: 5px;
    border-style: none;
}

.showlink:hover {
    background-color: transparent;
    color: white;
    border: 2px solid white;
}

p {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

div {
    text-align: center;
}

a {
    color: #9c6969;
    text-decoration: none !important;
}

a:hover {
    background-color: transparent;
    color: blue;
}

.title {
    font-weight: bold;
    color: #9c6969;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
    input {
        font-size: 16px;
    }
}

button {
    font-size: 16px;
    padding: 0.4rem 0.8rem;
    background-color: #9c6969;
    border-radius: 3px;
    color: white;
    text-decoration: none !important;
    margin: 5px;
}

button:hover {
    background-color: transparent;
    color: #9c6969;
    border: 2px solid #9c6969;
}

/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
