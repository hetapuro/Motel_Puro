import { useState, useEffect } from 'react'
import lodgingService from './services/lodging.js'
import axios from 'axios'
import './CSS/Lodging.css'

const App = () => {
  const [lodging, setLodging] = useState([])
  const [departure, setDeparture] = useState(new Date())

  useEffect(() => {
    lodgingService
      .get_current()
      .then(response => {
        setLodging(response.data)
      })
  })

  const changeLodging = (event) => {
    event.preventDefault()
  }

  const handleDepartureChange = (event) => {
    setDeparture(new Date(event.target.value))
  }

  const people = lodging.adults + lodging.children
  // const arrival = lodging.arrival.toString().slice(0, 10)

  // lodgingService
  //   .update(id, changedLodging)
  //   .then(response => {
  //     setLodgings(lodgings.map(lodging => lodging.id !== id ? lodging : response.data))
  //   })

  return (
    <div id='wrapper'>
        <div id='header'>
            <h1>Le Motel de Puro</h1>
        </div>
        <div id='middle'>
          <div className='formBG'>
              <h2>LOPETA MAJOITTAUTUMINEN</h2>
              <form onSubmit={changeLodging}>
                <p>Saapumispäivä:</p>
                <p><b>{lodging.arrival}</b></p>
                <p>Henkilöiden määrä:</p>
                <p><b>{people}</b></p>
    
                <label>Lähtöpäivä:</label> <br/>
                <input className='date' value={departure.toISOString().slice(0, 10)} type='date' onChange={handleDepartureChange}/> <br/>
    
                <button className='submit' type='submit'>KIRJAA</button>
              </form>
          </div>
        </div>
        <div id='footer'>
          <p>Heta Puro 2022</p>
        </div>
    </div>
  )

}

export default App