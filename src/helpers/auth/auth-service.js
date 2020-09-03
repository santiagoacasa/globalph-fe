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
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }


}

export default AuthService;