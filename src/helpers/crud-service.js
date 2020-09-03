import axios from 'axios';

class CrudService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
      withCredentials: true //envia el session Id que esta en la cookie al server
    });
    this.service = service;
  }
  searchPhotographers = searchParam => {
    return this.service.get(`/photographers?search=${searchParam}`, searchParam)
    .then(response => console.log(response.data))
  }

  updateProfile = updatedProfile => {
    return this.service.put('/updateProfile', updatedProfile)
    .then(response => response.data)
  }
}

export default CrudService;