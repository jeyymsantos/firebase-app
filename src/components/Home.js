import React from 'react';
import { Products } from './products/Products';
import { Navbar } from './pages/Navbar';
import '../assets/css/styles.css';
import Footer from './pages/Footer';


export const Home = () => {
    return (
        <div>
            <Navbar />

            <Products />

            <Footer />

        </div>
    );
};

export default Home;