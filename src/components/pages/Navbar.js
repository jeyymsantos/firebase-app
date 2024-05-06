import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>

            {/* <!-- Navigation--> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="#!"><b>Shopify</b></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            <li class="nav-item"><Link class="nav-link active" aria-current="page" to="/">Home</Link></li>
                            
                            <li class="nav-item"><Link class="nav-link" to='/login'>Sign In</Link></li>
                            <li class="nav-item"><Link class="nav-link" to='/sign-up'>Sign Up</Link></li>
                            <li class="nav-item"><Link class="nav-link" to='/add_product'>Add Product</Link></li>
                            <li class="nav-item"><Link class="nav-link" to='/add_location'>Add Location</Link></li>
                         
                        </ul>
                        <form class="d-flex">
                            <button class="btn btn-outline-dark" type="submit">
                                <i class="bi-cart-fill me-1"></i>
                                Cart
                                <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;