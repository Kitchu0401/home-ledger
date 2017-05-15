<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-6 col-xs-offset-3">
        <form onsubmit="return false">
          <div class="form-group">
            <label for="authKey">Type authentication key!</label>
            <input type="text" class="form-control" id="authKey" v-model="authKey">
          </div>
          <button class="btn btn-primary form-control" v-on:click="login">Submit AuthKey</button>
          <div class="alert alert-danger" role="alert" style="margin-top: 15px; text-align: center;" v-if="message">{{message}}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../../service/authService'

export default {
  data () {
    return {
      authKey: '',
      message: ''
    }
  },
  methods: {
    login () {
      authService.login(this.authKey)
        .then((isAuthenticated) => {
          if ( isAuthenticated ) {
            this.$router.push({ name: 'main' })
          } else {
            this.message = '유효한 인증키가 아닙니다.'
          }
        })
        .catch((error) => {
          console.error(error)
          this.message = '서버통신 과정에서 오류가 발생했습니다.'
        })
    }
  }
}
</script>
