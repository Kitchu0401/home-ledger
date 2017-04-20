<template>
    <div class="movies">
        <h1>영화 목록</h1>
        <div class="movie" v-for="movie in movies">
            <router-link v-bind:to="{ name: 'showPage', params: { id: movie.id } }">
                <img class="poster" v-bind:src="movie.poster">
            </router-link>
            <p><strong>{{ movie.name }}</strong> [{{ movie.year }}]</p>
            <p><i>{{ movie.director }}</i></p>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$http.get('/api/movies')
        .then((response) => {
            this.movies = response.data;
        });
    },
    data() {
        return {
            movies: [],
        };
    },
};
</script>

<style>
.movie {
    display: inline-block;
}
.movie img {
    width: 160px;
    height: 240px;
}
</style>
