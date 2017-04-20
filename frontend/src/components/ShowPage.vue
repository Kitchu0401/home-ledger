<template>
    <div class="movie-detail">
        <h1>상세 내용</h1>
        <img class="poster" v-bind:src="movie.poster">
        <p><strong>{{ movie.name }}</strong> [{{ movie.year }}]</p>
        <p><i>{{ movie.director }}</i></p>
        <router-link v-bind:to="{ name: 'indexPage' }">목록으로</router-link>
    </div>
</template>

<script>
export default {
    created() {
        var id = this.$route.params.id;
        this.$http.get(`/api/movies/${id}`)
        .then((response) => {
            this.movie = response.data;
        });
    },
    data() {
        return {
            movie: {}
        };
    }
};
</script>

<style>
.movie-detail img {
    width: 240px;
    height: 360px;
}
</style>
