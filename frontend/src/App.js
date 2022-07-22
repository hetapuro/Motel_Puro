import { useState, useEffect } from 'react'
import "./CSS/App.css"
import lodgingService from "./services/lodging"
import LoginForm from "./JS/LoginForm"
import Lodging from "./JS/Lodging"
import History from "./JS/History"
import End from "./JS/End"
import Change from "./JS/Change"
import { getAuthedUser } from "./services/users"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

const App = () => {
  const [loggedIn, setLoggedIn ] = useState(false)
  const [authedUser, setAuthedUser ] = useState(null)
  const [current, setCurrent] = useState(null)

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
      const fetchData = async () => {
        const current_lodging = await lodgingService.get_current()
        setCurrent(current_lodging)
      }
      if(authedUser){
          setLoggedIn(true)
          fetchData()
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
                    {current && (
                        <Route path="/" element={<End propLodging={current}  setCurrent={setCurrent}/>} />
                      )}
                    {!current && (
                      <Route path="/" element={<Lodging />} />
                    )}
                      <Route path="/historia" element={<History />} />
                      <Route path="/muokkaa" element={<Change setCurrent={setCurrent}/>} />                                     
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