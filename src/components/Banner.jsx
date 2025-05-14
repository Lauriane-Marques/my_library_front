import React from 'react';
import { Link } from 'react-router';
import { FaUserAlt, FaSearch } from "react-icons/fa";
import logo from "./../assets/logo.png"

const Banner = () => {
    return (
        <div className='flex flex-row justify-between items-center bg-persian-green shadow-md p-3 w-full'>
            <img src={logo} className='size-12 bg-white'></img>
            <div className='text-white text-5xl ml-4'>My library</div>
            <div className='flex-grow mx-8'>
                <nav className='w-full'>
                    <ul className='flex flex-row text-2xl justify-center gap-12 text-white'>
                        <li><Link to="/" className='hover:underline'>Homepage</Link></li>
                        <li><a href="#" className='hover:underline'>My Books</a></li>
                        <li><Link to="/aboutus" className='hover:underline'>About Us</Link></li>
                    </ul>
                </nav>
            </div>

            <div className='flex flex-row gap-6 mr-4'>
                <div className='flex flex-row'><input placeholder='search books' className='bg-white px-2 mr-2'></input><FaSearch className='size-8 text-white' /></div>
                <Link to="/login"><FaUserAlt className='size-8 text-white'/></Link>
            </div>
        </div>
    );
};

export default Banner;