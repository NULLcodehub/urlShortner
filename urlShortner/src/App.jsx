import { React, useContext } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Navbar from './components/Navnbar/Navbar'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import HomePage from './components/HomePage/HomePage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import { AuthContext } from './contexts/AuthContext'


function App() {

  const {isAuth}=useContext(AuthContext)
  // console.log(isAuth)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
            {/* <Route index element={<HomePage/>}/> */}
            {!isAuth ? <Route index element={<HomePage/>}/>:<Route index element={<ProfilePage/>}/> }
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

        </Route>
      </Routes>
      

    </>
  )
}

export default App
