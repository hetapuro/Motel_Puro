import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/lodgings'

const create = (data) => {
    const request = axios.post(baseUrl,data)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

const get_current = () => {
  const request = axios.get(`${baseUrl}/current`)
  return request.then(response => response.data)
}
export default { create, update, get_current }