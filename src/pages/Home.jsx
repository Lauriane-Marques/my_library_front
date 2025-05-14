import React from 'react';
import { Link } from 'react-router';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
            <Banner/>
            <h1 className=''>Hello</h1>
            <p><Link className='link-inscription' to="/signup">Sign up</Link></p>
            <p><Link to="/login">Register</Link></p>
        </div>
    );
};

export default Home;