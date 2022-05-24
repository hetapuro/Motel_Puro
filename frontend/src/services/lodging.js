import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/lodgings'

const create = (lodging) => {
    const request = axios.post(baseUrl,lodging)
    return request.then(response => response.data)
}

export default { create }