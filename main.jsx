import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // THIS IS YOUR SETTINGS COMPONENT
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> // IT MUST RENDER <App />
  </React.StrictMode>,
)
