import React from 'react';
import {Link} from 'react-router-dom'
import './HomePage.css'
import bannerImage from '../../assets/bannerImage/urlshortner.png'
const HomePage = () => {
    return (
        <>
            <main className=' h-screen md:flex  bg-white ' >
                <section className=' md:w-6/12  flex justify-right'>
                    <div className='overflow-auto my-16 p-10 md:p-0  md:pl-24 '>
                        <h1 className='text-40px md:text-70px'>Build Strong Digital</h1>
                        <h1 className='text-40px md:text-70px h12 '>Connections</h1>
                        <p className='text-gray-600'>Welcome to Dwarf link, your go-to solution for shortening and customizing URLs, complete with performance analytics. Simplify sharing and enhance your digital presence today!</p>
                        <Link to='/login'><button className='px-3 py-3 my-5 homebutton rounded-md '>Get Start For Free</button></Link>
                    </div>
                </section>

                <section className=' md:w-6/12 h-96 bg-white'>
                    <img src={bannerImage} alt="" />
                </section>

            </main>
        
        </>
    );
};

export default HomePage;