import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            <h1>Hello</h1>
            <p><Link className='link-inscription' to="/signup">Sign up</Link></p>
            <p><Link to="/login">Register</Link></p>
        </div>
    );
};

export default Home;