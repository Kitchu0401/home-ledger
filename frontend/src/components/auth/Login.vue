<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4 col-xs-offset-4">
        <form onsubmit="return false">
          <div class="form-group">
            <label for="authKey">Type authentication key!</label>
            <input type="text" class="form-control" id="authKey" v-model="authKey">
          </div>
          <button class="btn btn-primary form-control" v-on:click="login">Submit AuthKey</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '../../service/authService'

export default {
  components: {
    
  },
  data () {
    return {
      authKey: 'testAuthKey'
    }
  },
  methods: {
    login () {
      authService.login(this.authKey)
        .then((result) => {
          authService.isAuthenticated = result.data.isAuthenticated
          console.debug('authService.isAuthenticated', authService.isAuthenticated)
          if ( authService.isAuthenticated ) {
            console.debug('loged in!')
          } else {
            console.error('login failed!')
          }
        })
        .catch((error) => { console.error(error) })
    }
  }
}
</script>
