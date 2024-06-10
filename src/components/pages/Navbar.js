import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../config/Firebase';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ userName, totalProducts }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/login');
        })
    }

    return (
        <div>

            {/* <!-- Navigation--> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-4 px-lg-5">
                    <a class="navbar-brand" href="/"><b>Shopify</b></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            {userName && <>
                                <li class="nav-item"><Link class="nav-link" to='/add_product'>Add Product</Link></li>
                                <li class="nav-item"><Link class="nav-link" to='/add_location'>Add Location</Link></li>
                            </>}
                        </ul>

                        {userName && <>
                            <Link class="nav-link" to='/cart'>My Cart ({totalProducts}) </Link>
                            <h6 class="ms-5 mt-2 me-2"> Hi, {userName}! </h6>
                            <button class="btn btn-outline-danger" onClick={handleLogout}>
                                <i class="bi-cart-fill me-1"></i>
                                Logout
                            </button>
                        </>}

                        {!userName && <>
                            <ul class="navbar-nav">
                                <li class="nav-item"><Link class="nav-link" to='/login'>Sign In</Link></li>
                                <li class="nav-item"><Link class="nav-link" to='/sign-up'>Sign Up</Link></li>
                            </ul>
                        </>}

                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;