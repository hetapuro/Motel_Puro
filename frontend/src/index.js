import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './JS/Change'

const lodgings = [
    {
        id: 1,
        arrival: '2019-05-30T17:30:31.098Z',
        adults: 2,
        children: 3
    },
    {
        id: 2,
        arrival: '2019-05-30T19:20:14.298Z',
        adults: 4,
        children: 0
    }
]

ReactDOM.createRoot(document.getElementById('root')).render(<App />)