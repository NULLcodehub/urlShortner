import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { DataProvider } from './contexts/dataListContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
        
            <App />
          
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
    
  </React.StrictMode>,
)
