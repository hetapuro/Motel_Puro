import { useState, useEffect } from 'react'
import lodgingService from '../services/lodging'
import '../CSS/Lodging.css'
import { Router, useLocation, useNavigate } from 'react-router-dom'

const Lodging = ({setCurrent}) => {
  const [id, setId] = useState(null)
  const [adults, setAdults] = useState(null)
  const [children, setChildren] = useState(null)
  const [arrival, setArrival] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const stateLodging = location.state
    console.log("lodging", stateLodging)
    setId(stateLodging.id)
    setAdults(stateLodging.adults)
    setChildren(stateLodging.children)
    setArrival(new Date(stateLodging.arrival))
  },[])

  const updateLodging = async (event) => {
    event.preventDefault()
    const changedLodging = {
      id,
      arrival,
      adults,
      children,
      departure: null
    }
    await lodgingService
    .update(changedLodging)
    await setCurrent(changedLodging)
    navigate("/")
    
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
      <div id='middle'>
        {id && (
          <div className='formBG'>
          <h2 className='title'>MUOKKAA MAJOITTAUTUMISTA</h2>
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
        )}
      </div>
  )

}

export default Lodging