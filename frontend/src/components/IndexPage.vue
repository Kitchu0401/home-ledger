<template>
    <div class="movies">
        <h1>영화 목록</h1>
        <div class="movie" v-for="movie in movies">
            <img class="poster" v-bind:src="movie.poster">
            <div>
                <strong>{{ movie.name }}</strong>, <i>{{ movie.director }}</i> [{{ movie.year }}]
                <router-link v-bind:to="{ name: 'showPage', params: { id: movie.id } }">더보기</router-link>
            </div>
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
