import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import { AuthProvider } from './auth/authContext'
import GuestGuard from './guestGuard'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
