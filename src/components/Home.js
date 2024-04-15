import React from 'react';
import { Products } from './Products';
import { Navbar } from './Navbar';

export const Home = () => {
    return (
        <div>
            <Navbar />
            <Products />
        </div>
    );
};

export default Home;