import { useState } from "react"
import { loginUser } from "../services/auth"
import '../CSS/LoginForm.css'

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
    <div id='wrapper'>
        <div id='header'>
        <h1>Le Motel de Puro</h1>
        </div>
        <div id='middle'>
        <div className='logIn'>
            <h1>TERVETULOA!</h1>
            <h2>Aloita kirjautumalla</h2>
            <form onSubmit={checkCredentials}>
            <label>Sähköposti:</label> <br/>
            <input className='logInput' type='email' onChange={handleEmailChange} value={email} placeholder='esimerkki@esim.com'/> <br/>
            <label>Salasana:</label> <br/>
            <input className='logInput' type='password' value={password} onChange={handlePasswordChange} placeholder='salasana123'/> <br/>

            <button className='logSubmit' type='submit'>KIRJAUDU</button> 
            </form>
            <p>
            <a href=''>Unohditko salasanasi?</a>
            </p>
        </div>
        </div>
        <div id='footer'>
        <p>2022 Heta Puro, Touko Puro</p>
        </div>
    </div>
    )

}

export default LoginForm