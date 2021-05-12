<template>
    <div>
        <br />
        <br />
        <p class="hometext">Welcome! This site will allow you to explore Marvel Characters, Comics, and Series.</p>

        <p class="hometext">
            The application queries three of Marvel's API end-points to retrieve information about
            <router-link style="color: #9c6969;" :to="{ name: 'charactersList', params: { page: 0 } }">Characters</router-link>,
            <router-link style="color: #9c6969;" :to="{ name: 'comicsList', params: { page: 0 } }">Comics</router-link>, and
            <router-link style="color: #9c6969;" :to="{ name: 'seriesList', params: { page: 0 } }">Series</router-link> in the Marvel Universe! You
            can click on the cards in these pages for more details about that particular item.
        </p>
    </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
