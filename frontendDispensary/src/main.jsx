import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// ✅ Always send cookies with requests (for authentication)
axios.defaults.withCredentials = true

// ✅ Set the base URL for all axios requests (Vite reads this from .env)
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

// ✅ Log the backend URL once to confirm it's being read
console.log("🌐 Axios Base URL:", axios.defaults.baseURL)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
