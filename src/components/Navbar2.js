import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar2 = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    
    <Link to='/' class="navbar-brand" > Jeyym Santos </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
            <Link to='login' class="nav-link" > Login </Link>
        </li>
        <li class="nav-item">
          <Link to='sign-up' class="nav-link"> Sign Up </Link>
        </li>
       
      </ul>
     
    </div>
  </div>
</nav>
    );
};

export default Navbar2;