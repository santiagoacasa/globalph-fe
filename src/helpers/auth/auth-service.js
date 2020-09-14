import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true //envia el session Id que esta en la cookie al server
    });
    this.service = service;
  }

  signup = (newUser) => {
    return this.service.post('/signup', newUser)
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => {
      console.log("Hay un usuario logueado que es", response.data)
      return response.data
    })
  }

  login = (email, password, isPhotographer) => {
    return this.service.post('/login', {email, password,isPhotographer})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }


}

export default AuthService;