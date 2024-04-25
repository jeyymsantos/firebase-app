import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Link to='sign-up'> Sign Up </Link>
            <Link to='login'> Login </Link>
        </div>
    );
};

export default Navbar;