import { React } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Navbar from './components/Navnbar/Navbar'
import HomePage from './components/HomePage/HomePage'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

        </Route>
      </Routes>
      

    </>
  )
}

export default App
