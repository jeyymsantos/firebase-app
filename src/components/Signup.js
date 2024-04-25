import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

export const Signup = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        console.log(fullName, email, password);
    }


    return (
        <div className='container'>

            <h1> Sign Up</h1>
            <hr />

            <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
                <div class="mb-3">
                    <label class="form-label">Full Name</label>
                    <input type="text" className="form-control" required 
                    onChange={(e) => setFullName(e.target.value)} value={fullName}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" className="form-control" required 
                    onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" className="form-control" required 
                    onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>

                <div className='btn-box'>
                    <span> Already has an account? Login <Link to="/login" className='link'>Here</Link>
                    </span>
                </div>

                <button type="submit" className="btn btn-success">Register</button>
            </form>

        </div>
    );
};

export default Signup;