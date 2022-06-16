import { useState } from "react"
import { loginUser } from "./services/auth"

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail ] = useState("")
    const [password, setPassword] = useState("")
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const checkCredentials = async (event) => {
        event.preventDefault()
        const response = await loginUser({email, password})
        if(response !== "error"){
            handleLogin()
        }
    }
    return(
    <form onSubmit={checkCredentials}>
        <p>Kirjaudu</p>
        <input value={email} onChange={handleEmailChange}/> <br/>
        <input value={password} onChange = {handlePasswordChange}/> <br/>
        <button className='submit' type='submit'>Kirjaudu</button>
      </form>
    )

}

export default LoginForm