import axios from 'axios';

class CrudService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/crud`,
      withCredentials: true //envia el session Id que esta en la cookie al server
    });
    this.service = service;
  }
  searchPhotographers = searchParam => {
    console.log(searchParam)
    return this.service.get(`/photographers`, {
      params: {
        search: searchParam
      }
    })
    .then(response => {
      console.log(response.data)
      return response.data
    })
  }

  updateProfile = updatedProfile => {
    return this.service.patch('/updateProfile', updatedProfile)
    .then(response => response.data)
  }
}

export default CrudService;