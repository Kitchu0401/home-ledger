import axios from 'axios'

export default {

  isAuthenticated: false,

  login: (authKey) => {
    return new Promise((onFurfilled, onRejected) => {
      axios.post('/HomeLedger/api/auth', { authKey: authKey })
        .then(onFurfilled)
        .catch(onRejected)
    })
  }

}