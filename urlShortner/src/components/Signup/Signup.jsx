import React, { useState } from 'react';
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios';
const Signup = () => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const nameDebounced=useDebounce(name,500)
    const emailDebounced=useDebounce(email,500)
    const passwordDebounced=useDebounce(password,500)

    const handelSignUp= async (e)=>{
        e.preventDefault();

        try{
            const responce=await axios.post('http://localhost:4000/signup',{
                username:nameDebounced,
                email:emailDebounced,
                password:passwordDebounced,
            })
            console.log(responce)
            setEmail('')
            setName('')
            setPassword('')

        }catch(err){
            console.log(err)
        }



    }

    return (
        <section className='h-screen flex justify-center  my-16 '>
                
                <div className='w-full h-fit md:w-4/12 formClass'>
                    <form action="" onSubmit={handelSignUp}  className='p-10'>
                        <div className='text-center'>
                            <h1 className='text-3xl mb-5'>Sign up</h1>
                        </div>
                        <div className='flex flex-col gap-5'>

                            <input type="text"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='Full name'
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                
                              />
                            
                            <input type="email"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='yourmail@email.com'
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                
                              />
                            <input type="password"
                                className='px-3 border-2 border-black rounded-md'
                                placeholder='password' 
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                
                              
                              />
                            
                        </div>
                        <div>
                            <button className='w-full border-2 rounded-md border-black my-5 h-10'>Sign up</button>
                        </div>

                    </form>
                </div>
                

            </section>
    );
};

export default Signup;