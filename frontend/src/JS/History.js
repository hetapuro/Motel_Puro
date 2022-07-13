import { useState, useEffect } from 'react'
import axios from 'axios'
import '../CSS/History.css'

const Lodging = ({lodging}) => {
  const people = lodging.adults + lodging.children
  const a = lodging.arrival.toString().slice(0, 10)

  return (
    <tr>
      <th>Etunimi Sukunimi</th>
      <th>{a}</th>
      <th>{lodging.departure}</th>
      <th>{people}</th>
    </tr>
  )
}

const App = () => {
  const [lodgings, setLodgings] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/lodgings')
      .then(response => {
        console.log('promise fulfilled')
        setLodgings(response.data)
      })
  }, [])

  return (
      <div id='histWrap'>
        <h2 id="all">Majoituksia yhteensä: </h2>
        <table>
          <thead>
            <tr>
              <th className='bold'>Nimi</th>
              <th className='bold'>Saapumispäivä</th>
              <th className='bold'>Lähtöpäivä</th>
              <th className='bold'>Henkilöt</th>
            </tr>
          </thead>
          <tbody>
            {lodgings.map(lodging =>
              <Lodging key={lodging.id} lodging={lodging} />
              )}
          </tbody>
        </table>
      </div>
  )

}

export default App