import React, { useContext } from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const {isAuth,logout}=useContext(AuthContext)

    return (
        <>
            <nav className='flex justify-around my-5'>
                <section>
                    <div className='text-xl'>Dwarf Links</div>
                </section>
                <section>
                    <div>
                        <ul className='flex gap-4'>
                            {!isAuth && <Link to='/login'><li className='px-3 py-1'>Log in</li></Link> }
                            {!isAuth && <Link to='/signup'><li className='signup px-3 py-1'>Sign up</li></Link>}
                            {isAuth && <button  className='signup px-3 py-1' onClick={logout}>logout</button>}
                            
                        </ul>
                    </div>
                </section>
            </nav>
        
        </>
    );
};

export default Navbar;