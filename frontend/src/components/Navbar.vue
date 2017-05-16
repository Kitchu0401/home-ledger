<template>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <router-link class="navbar-brand" v-bind:to="{ name: 'main' }">죽전생존</router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-if="$route.name !== 'login'">
            <ul class="nav navbar-nav">
                <li><router-link v-bind:to="{ name: 'chart' }">가계부 통계</router-link></li>
                <li><router-link v-bind:to="{ name: '' }">미세먼지 예보</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="$route.name === 'main'">
                <li><router-link v-bind:to="{ name: 'detail' }">새로 작성하기</router-link></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
</template>
