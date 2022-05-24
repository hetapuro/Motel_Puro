import { useState } from 'react'
import './App.css'

const App = () => {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

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

  //kun laittaa 7, lukee, että 70
  const handleAdultsChange = (event) => {
    console.log(event.target.value)
    setAdults(event.target.value)
  }

  return (
    <div id='wrapper'>
      <div id='header'>
        <h1>Le Motel de Puro</h1>
      </div>
      <div>
        <h2>Majoittaudu</h2>
        <form>
            <label>Saapumispäivä:</label> <br/>
            <input type='date'/>

            <label>Aikuisia:</label> <br/>
            <button type='button' onClick={minusA}>-</button>
            <input value={adults} onChange={handleAdultsChange}/>
            <button type='button' onClick={plusA}>+</button> <br/>

            <label>Lapsia: </label> <br/>
            <button type='button' onClick={minusC}>-</button>
            <span>{children}</span>
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