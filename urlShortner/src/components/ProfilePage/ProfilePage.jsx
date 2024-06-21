import React from 'react';
import './ProfilePage.css'
import UrlForm from '../UrlForm/UrlForm';
import UserProfile from './UserProfile';
import UrlTable from '../UrlsTable/UrlTable';

const ProfilePage = () => {
    return (
        <>
            <main className=' h-screen md:flex justify-center bg-white'>
                <section className='md:w-5/12 py-6'>
                    <UrlForm/>
                </section>
                <section className=' h-screen md:w-6/12 p-5 border-l-2'>
                    <UserProfile/>
                    <h2 className='py-2'>Your Urls</h2>  
                    <section className='h-5/6 overflow-scroll px-1 tableScroll'>
                        <div >
                            <UrlTable/>
                        </div>
                    </section>
                </section>

            </main>
        
        </>
    );
};

export default ProfilePage;