import { useState } from 'react'
import lodgingService from './services/lodging'
import './App.css'

const App = () => {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [arrival, setArrival] = useState(new Date())

  const addLodging = (event) => {
    event.preventDefault()
    const lodging = {
      arrival,
      adults,
      children
    }
    lodgingService.create(lodging)
  }

  const minusA = () => {
    if (adults > 1) {
      setAdults(adults - 1)
    }
  }

  const plusA = () => {
    setAdults(adults + 1)
  }

  const minusC = () => {
    if (children > 0) {
      setChildren(children - 1)
    }
  }

  const plusC = () => {
    setChildren(children + 1)
  }

  var people = adults + children

  const handleAdultsChange = (event) => {
    console.log(event.target.value)
    setAdults(event.target.value === "" ? 0 : parseInt(event.target.value))
  }

  const handleChildrenChange = (event) => {
    console.log(event.target.value)
    setChildren(event.target.value === "" ? 0 : parseInt(event.target.value))
  }

  const handleArrivalChange = (event) => {
    setArrival(new Date(event.target.value))
  }

  return (
    <div id='wrapper'>
      <div id='header'>
        <h1>Le Motel de Puro</h1>
      </div>
      <div>
        <h2>Majoittaudu</h2>
        <form onSubmit={addLodging}>
            <label>Saapumispäivä:</label> <br/>
            <input value={arrival.toISOString().slice(0, 10)} type='date' onChange={handleArrivalChange}/> <br/>

            <label>Aikuisia:</label> <br/>
            <button type='button' onClick={minusA}>-</button>
            <input value={adults === 0 ? "" : adults} onChange={handleAdultsChange}/>
            <button type='button' onClick={plusA}>+</button> <br/>

            <label>Lapsia: </label> <br/>
            <button type='button' onClick={minusC}>-</button>
            <input value={children === 0 ? "" : children} onChange={handleChildrenChange}/>
            <button type='button' onClick={plusC}>+</button>
            <p>Henkilöiden määrä: {people}</p>
  
          <button type='submit'>Kirjaa majoittautuminen</button>
        </form>
      </div>
      <div>
        <h2>Majoittautumiset</h2>
      </div>
    </div>
  )

}

export default App