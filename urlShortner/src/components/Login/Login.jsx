import React, { useContext, useState } from 'react';
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import {ClipLoader} from 'react-spinners'

import './Login.css'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const emailDebounce=useDebounce(email,500)
    const passwordDebounce=useDebounce(password,500)

    const [loading,setLoading]=useState(false)

    const {login}=useContext(AuthContext)

    const navigate=useNavigate()



    const handelSubmit= async (e)=>{
        e.preventDefault()
        setLoading(true)
        if(emailDebounce || passwordDebounce){

            try{ 
                const responce= await axios.post('https://dwarf-opal.vercel.app/login',{
                    email:emailDebounce,
                    password:passwordDebounce,
                })

                if(responce){
                    login(responce.data.token)

                    setEmail('')
                    setPassword('') 
                    navigate('/')
                }
                // console.log(responce.data.token)
                // localStorage.setItem('token',responce.data.token)
                

            }catch(err){
                console.log(err)
                alert('Wrong Email and Password')
                setLoading(false)
            }

           
        }

    };

    return (
        <>

            <section className='h-screen flex justify-center  my-16 '>
                
                <div className='w-full h-fit md:w-4/12 formClass bg-white'>
                    <form action="" onSubmit={handelSubmit} className='p-10'>
                        <div className='text-center'>
                            <h1 className='text-3xl mb-5 title'>Dwarf Link</h1>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <input type="email"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='yourmail@email.com'
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                              
                              
                              />
                            <input type="password"
                                className='px-3 border-2 border-black rounded-md'
                                placeholder='password' 
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                
                              
                              />
                            
                        </div>
                        <div>
                            <button className='w-full  rounded-md  my-5 h-10'>
                                {
                                    loading ? <ClipLoader size={20} color={"black"}/>: 'Log In'
                                }

                            </button>
                        </div>

                        <p className='text-xs text-gray-400 text-center'>Login as guest: username: guestuser ,  pass: 19208# </p>

                    </form>
                </div>
                

            </section>
            
        </>
    );
};

export default Login;