import axios from "axios"
const baseUrl = "http://localhost:3001/api/auth"

export const loginUser = async (credentials) => {
    try {
        console.log("Loging in")
      const response = await axios.post(`${baseUrl}/email`, credentials)
      console.log(response)
    } catch (err) {
      console.log(err.message)
      return "error"
    }
  }

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${baseUrl}/logout`)
        console.log(response.data)
      } catch (err) {
        console.log(err.message)
      }
}