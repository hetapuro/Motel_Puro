import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/lodgings'

//getAll

//getSpesifics

const create = (lodging) => {
    const request = axios.post(baseUrl,lodging)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { create, update }