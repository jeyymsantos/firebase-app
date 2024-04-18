import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div>
            <Navbar />

            <div className='container col-4 mt-5'>

                <h1>User Login</h1> <br />

                <form className='form-group' autoComplete='off' onSubmit={handleSignin}>
                    <div class="mb-3">
                        <label class="form-label">Email address</label>
                        <input type="email" className="form-control" required
                            onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" className="form-control" required
                            onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>

                    <div className='btn-box'>
                        <span> Doesn't have an account? Register <Link to="/sign-up" className='link'>here</Link>
                        </span>
                    </div>

                    <button type="submit" className="btn btn-success mt-3">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;