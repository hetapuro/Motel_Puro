import { useState, useEffect } from 'react'
import lodgingService from '../services/lodging.js'
import axios from 'axios'
import '../CSS/Lodging.css'
import { Link } from "react-router-dom"

const App = ({propLodging, setCurrent}) => {
  const [lodging, setLodging] = useState(propLodging)
  const [departure, setDeparture] = useState(new Date())

  const changeLodging = (event) => {
    event.preventDefault() 
    const endLodging = {
      arrival: lodging.arrival,
      adults: lodging.adults,
      children: lodging.children,
      departure: departure
    }
    lodgingService
    .update(lodging.id, endLodging)
    .then(response => {
      setCurrent(null)
    })
  }

  const handleDepartureChange = (event) => {
    setDeparture(new Date(event.target.value))
  }

  const people = lodging.adults + lodging.children
  // const arrival = lodging.arrival.toString().slice(0, 10)

  return (
        <div id='middle'>
          <div className='formBG'>
              <h2 className='title'>LOPETA MAJOITTAUTUMINEN</h2>
              <form onSubmit={changeLodging}>
                <p>Saapumispäivä:</p>
                <p><b>{lodging.arrival}</b></p>
                <p>Henkilöiden määrä:</p>
                <p><b>{people}</b></p>
    
                <label>Lähtöpäivä:</label> <br/>
                <input className='date' value={departure.toISOString().slice(0, 10)} type='date' onChange={handleDepartureChange}/> <br/>
    
                <button className='submit' type='submit'>KIRJAA</button>
                <button className='submit' type=''> <Link to="/muokkaa" id="change" state={lodging}>MUOKKAA</Link></button>
              </form>
          </div>
        </div>
  )

}

export default App