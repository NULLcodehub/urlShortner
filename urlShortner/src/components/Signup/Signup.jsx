import React, { useContext, useState } from 'react';
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Signup = () => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const nameDebounced=useDebounce(name,500)
    const emailDebounced=useDebounce(email,500)
    const passwordDebounced=useDebounce(password,500)

    const [loading,setLoading]=useState(false)

    const {login}=useContext(AuthContext)

    const navigate=useNavigate()

    const handelSignUp= async (e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const responce=await axios.post('https://dwarf-opal.vercel.app/signup',{
                username:nameDebounced,
                email:emailDebounced,
                password:passwordDebounced,
            })
            if(responce){
                console.log(responce)
                login(responce.data.token)
                setEmail('')
                setName('')
                setPassword('')
                navigate('/')
                
            }
            

        }catch(err){
            console.log(err)
            alert('somthing is wrong try again after few time')
            setLoading(false)
        }



    }

    return (
        <section className='h-screen flex justify-center  my-16 '>
                
                <div className='w-full h-fit md:w-4/12 formClass bg-white'>
                    <form action="" onSubmit={handelSignUp}  className='p-10'>
                        <div className='text-center'>
                            <h1 className='text-3xl mb-5 title'>Dwarf Link</h1>
                        </div>
                        <div className='flex flex-col gap-5'>

                            <input type="text"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='Full name'
                                value={name}
                                required
                                onChange={e=>setName(e.target.value)}
                                
                              />
                            
                            <input type="email"
                                className=' px-3 border-2 border-black rounded-md ' 
                                placeholder='yourmail@email.com'
                                required
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                
                              />
                            <input type="password"
                                className='px-3 border-2 border-black rounded-md'
                                placeholder='password' 
                                required
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                
                              
                              />
                            
                        </div>
                        <div>
                            <button className='w-full rounded-md  my-5 h-10'>
                                {
                                    loading ? <ClipLoader size={20} color={'black'}/>: 'Sign Up'

                                }
                                
                                </button>
                        </div>

                    </form>
                </div>
                

            </section>
    );
};

export default Signup;