import { useState, useEffect } from 'react'
import lodgingService from './services/lodging'
import './CSS/Lodging.css'

const Lodging = ({ authedUser }) => {

  const [adults, setAdults] = useState(null)
  const [children, setChildren] = useState(null)
  const [arrival, setArrival] = useState(new Date())

useEffect(() => {
lodgingService
    .get_current()
    .then(response => {
    setAdults(response.data.adults === "" ? 0 : parseInt(response.data.adults))
    setChildren(response.data.children === "" ? 0 : parseInt(response.data.children))
    // setArrival(new Date(response.data.arrival))
    })
})

  const updateLodging = (event) => {
    event.preventDefault()
    const data = {
      arrival,
      adults,
      children,
      user_id: authedUser.id
    }
    lodgingService.update(data)
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
      <div id='middle'>
        <div className='formBG'>
          <h2>MUOKKAA MAJOITTAUTUMISTA</h2>
          <form onSubmit={updateLodging}>
            <label>Saapumispäivä:</label> <br/>
            <input className='date' value={arrival.toISOString().slice(0, 10)} type='date' onChange={handleArrivalChange}/> <br/>
              
            <label>Aikuisia:</label> <br/>
            <button type='button' onClick={minusA}>-</button>
            <input className='counter' value={adults === 0 ? "" : adults} onChange={handleAdultsChange}/>
            <button type='button' onClick={plusA}>+</button> <br/>

            <label>Lapsia: </label> <br/>
            <button type='button' onClick={minusC}>-</button>
            <input className='counter' value={children === 0 ? "" : children} onChange={handleChildrenChange}/>
            <button type='button' onClick={plusC}>+</button>
            <p>Henkilöiden määrä: <b>{people}</b></p>

            <button className='submit' type='submit'>MUOKKAA</button>
          </form>
        </div>
      </div>
      <div id='footer'>
        <p>Heta Puro 2022</p>
      </div>
    </div>
  )

}

export default Lodging