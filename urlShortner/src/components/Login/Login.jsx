import React, { useContext, useEffect, useState } from 'react';
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios'
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const emailDebounce=useDebounce(email,500)
    const passwordDebounce=useDebounce(password,500)

    const {login}=useContext(AuthContext)





    const handelSubmit= async (e)=>{
        e.preventDefault()

        if(emailDebounce || passwordDebounce){

            try{ 
                const responce= await axios.post('http://localhost:4000/login',{
                    email:emailDebounce,
                    password:passwordDebounce,
                })
                console.log(responce.data.token)
                // localStorage.setItem('token',responce.data.token)
                login(responce.data.token)

                setEmail('')
                setPassword('')


            }catch(err){
                console.log(err)
            }

           
        }

    };

    return (
        <>

            <section className='h-screen flex justify-center  my-16 '>
                
                <div className='w-full h-fit md:w-4/12 formClass'>
                    <form action="" onSubmit={handelSubmit} className='p-10'>
                        <div className='text-center'>
                            <h1 className='text-3xl mb-5'>Log in</h1>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <input type="email"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='yourmail@email.com'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                              
                              
                              />
                            <input type="password"
                                className='px-3 border-2 border-black rounded-md'
                                placeholder='password' 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                
                              
                              />
                            
                        </div>
                        <div>
                            <button className='w-full border-2 rounded-md border-black my-5 h-10'>Login</button>
                        </div>

                    </form>
                </div>
                

            </section>
            
        </>
    );
};

export default Login;