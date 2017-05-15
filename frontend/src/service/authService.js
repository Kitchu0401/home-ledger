import axios from 'axios'

const authService = {

  isAuthenticated: false,

  login: (authKey) => {
    return new Promise((onFurfilled, onRejected) => {
      axios.post('/HomeLedger/api/auth', { authKey: authKey })
        .then((result) => {
          authService.isAuthenticated = result.data.isAuthenticated
          onFurfilled(authService.isAuthenticated)
        })
        .catch(onRejected)
    })
  }

}

export default authService