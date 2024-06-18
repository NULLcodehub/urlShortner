import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className='flex justify-around my-5'>
                <section>
                    <div className='text-xl'>Dwarf Links</div>
                </section>
                <section>
                    <div>
                        <ul className='flex gap-4'>
                            <Link to='/login'><li className='px-3 py-1'>Log in</li></Link>
                            <Link to='/signup'><li className='signup px-3 py-1'>Sign up</li></Link>
                        </ul>
                    </div>
                </section>
            </nav>
        
        </>
    );
};

export default Navbar;