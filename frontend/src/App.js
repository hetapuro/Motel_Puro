import { useState, useEffect } from 'react'
import lodgingService from './services/lodging'
import axios from 'axios'
import './Lodging.css'

const App = () => {
  const [lodgings, setLodgings] = useState([])
  const [departure, setDeparture] = useState(new Date())
  
  const changeLodging = (event) => {
    event.preventDefault()
  }

  const handleDepartureChange = (event) => {
    setDeparture(new Date(event.target.value))
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/lodgings')
      .then(response => {
        console.log('promise fulfilled')
        setLodgings(response.data)
      })
  }, [])

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
            <p><b>30.05.2022</b></p>
            <p>Henkilöiden määrä:</p>
            <p><b>3</b></p>

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