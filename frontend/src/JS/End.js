import { useState, useEffect } from 'react'
import lodgingService from '../services/lodging.js'
import axios from 'axios'
import '../CSS/Lodging.css'
import { Link } from "react-router-dom"

const App = ({propLodging, setCurrent}) => {
  const [lodging, setLodging] = useState(propLodging)
  const [departure, setDeparture] = useState(new Date())

    //disabling future dates
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
  
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd

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

  let arrival = lodging.arrival
  let DD = arrival.getDate()
  let MM = arrival.getMonth() + 1
  let YYYY = arrival.getFullYear()
  arrival = DD + '.' + MM + '.' + YYYY


  return (
        <div id='middle'>
          <div className='formBG'>
              <h2 className='title'>LOPETA MAJOITTAUTUMINEN</h2>
              <form onSubmit={changeLodging}>
                <p>Saapumispäivä:</p>
                <p><b>{arrival}</b></p>
                <p>Henkilöiden määrä:</p>
                <p><b>{people}</b></p>
    
                <label>Lähtöpäivä:</label> <br/>
                <input className='date' value={departure.toISOString().slice(0, 10)} type='date' onChange={handleDepartureChange} max={today}/> <br/>
    
                <button className='submit' type='submit'>KIRJAA</button>
                <button className='submit' type='button'> <Link to="/muokkaa" id="change" state={lodging}>MUOKKAA</Link></button>
              </form>
          </div>
        </div>
  )

}

export default App