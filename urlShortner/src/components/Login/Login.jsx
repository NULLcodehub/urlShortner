import React from 'react';
import useDebounce from '../../hooks/Debouncing';
import './Login.css'
const Login = () => {
    return (
        <>

            <section className='h-screen flex justify-center  my-16 '>
                
                <div className='w-full h-fit md:w-4/12 formClass'>
                    <form action="" className='p-10'>
                        <div className='text-center'>
                            <h1 className='text-3xl mb-5'>Log in</h1>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <input type="email" className=' px-3 border-2 border-black rounded-md '  placeholder='yourmail@email.com'/>
                            <input type="password" className='px-3 border-2 border-black rounded-md' placeholder='password' />
                            
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