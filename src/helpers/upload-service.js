import axios from 'axios'


class UploadService {
    constructor() {
      let service = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/upload`,
        withCredentials: true //envia el session Id que esta en la cookie al server
      });
      this.service = service;
    }
  
    uploadProfilePic = (profilePic) => {
      return this.service.post('/profilePic', profilePic)
      .then(({data}) => data)
    }

    uploadPortfolioPics = portfolioPics => {
      return this.service.post('/portfolioPics', portfolioPics)
      .then(({data}) => data)
    }
  }

  export default UploadService;