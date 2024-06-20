import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import './UserProfile.css'
const UserProfile = () => {
    const {tokenData}=useContext(AuthContext)
    console.log(tokenData)
    const firstCharecter=tokenData.username[0]
    console.log(firstCharecter)
    return (
        <>

            <main>
                <section className='flex justify-end items-center  py-3 '>
                    <div className='px-3 text-gray-500'>
                        <p className=''>{tokenData.username}</p>
                    </div>  
                    <div className='w-10 h-10 border-2 profilediv  text-xl rounded-full flex  justify-center'>
                        {firstCharecter}
                    </div>
                    
                </section>

            </main>
        
        </>
    );
};

export default UserProfile;