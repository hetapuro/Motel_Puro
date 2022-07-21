import { useState, useEffect } from 'react'
import "./CSS/App.css"
import LoginForm from "./JS/LoginForm"
import Lodging from "./JS/Lodging"
import History from "./JS/History"
import { getAuthedUser } from "./services/users"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

const App = () => {
  const [loggedIn, setLoggedIn ] = useState(false)
  const [authedUser, setAuthedUser ] = useState(null)

  const handleLogin = async () => {
      const user = await getAuthedUser()
      setAuthedUser(user)
  }

  useEffect(() => {

    const fetchData = async () => {
        const user = await getAuthedUser()
        user ? setAuthedUser(user) : setAuthedUser(null)
    }
    fetchData()

    
  }, [])

  useEffect(() => {
      if(authedUser){
          setLoggedIn(true)
          Router.push("/")
      }
  }, [authedUser])

  return (
      <div id='log'>
          {!loggedIn && (
              <LoginForm handleLogin = {handleLogin}/>
          )}
          {loggedIn && (
                <div id='wrapper'>
                  <Router>
                    <div id='header'>
                      <h1>Le Motel de Puro</h1>
                      <Link to="/">Majoitus</Link>
                      <Link to="/historia">Historia</Link>
                    </div>
                    
                    <Routes>
                      <Route path="/" element={<Lodging />} />
                      <Route path="/historia" element={<History />} />
                    </Routes>

                    <div id='footer'>
                      <p>Heta Puro 2022</p>
                    </div>
                  </Router>
              </div>
          )}
      </div>
  )

}

export default App