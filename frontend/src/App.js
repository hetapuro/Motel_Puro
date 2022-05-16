import { useState } from 'react'

const App = () => {
  const [lodgings, setLodgings] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  let [adults, setAdults] = useState(1)
  let [children, setChildren] = useState(0)

  function minusA() {
    if (adults > 1) {
      adults = adults - 1
      setAdults(adults)
    }
  }

  function plusA() {
    adults = adults + 1
    setAdults(adults)
  }

  function minusC() {
    if (children > 0) {
      children = children - 1
      setChildren(children)
    }
  }

  function plusC() {
    children = children + 1
    setChildren(children)
  }

  return (
    <div>
      <h2>Majoittaudu</h2>
      <form>
        <div>
          <label for='arrival'>Saapumispäivä:</label> 
          <br/>
          <input name='arrival' type='date'/>
          <br/>
        </div>
        <div>
          <button type='button' id='minusA' onClick={minusA}>-</button>
          <span id='adults'>{adults}</span>
          <button type='button' id='plusA' onClick={plusA}>+</button>
        </div>
        <div>
          <button type='button' id='minusC' onClick={minusC}>-</button>
          <span id='children'>{children}</span>
          <button type='button' id='plusC' onClick={plusC}>+</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App