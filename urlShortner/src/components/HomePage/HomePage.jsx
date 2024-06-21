import React from 'react';
import bannerImage from '../../assets/bannerImage/urlshortner.png'
const HomePage = () => {
    return (
        <>
            <main className=' h-screen md:flex  bg-white' >
                <section className=' md:w-6/12 h-96 flex justify-center items-center'>
                    <div className='overflow-auto'>
                        <h1 className='text-70px'>Build Strong Digital</h1>
                        <h1 className='text-70px'>Connections</h1>
                    </div>
                </section>

                <section className=' md:w-6/12 h-96'>
                    <img src={bannerImage} alt="" />
                </section>

            </main>
        
        </>
    );
};

export default HomePage;