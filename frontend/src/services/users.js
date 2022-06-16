import axios from "axios"

const apiUrl = "http://localhost:3001/api/users"

export const getAuthedUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/current/user`)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}