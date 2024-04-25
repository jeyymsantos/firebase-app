import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, fs } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const Login = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const handleSignIn = (e) => {
        e.preventDefault();
        console.log(fullName, email, password);
        signInWithEmailAndPassword(auth, email, password).then(() => {
            setSuccessMsg('SignIn Succesful. You will now redirected to Homepage');
            setFullName('');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(() => {
                setSuccessMsg('');
                navigate('/')
            }, 3000)
        }).catch(error => setErrorMsg(error.message));
    }


    return (

        <div>

            <Navbar />

            <div className='container col-4 mt-5'>

                <h1> Login</h1>
                <hr />

                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>}

                <form className='form-group' autoComplete='off' onSubmit={handleSignIn}>
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

                    <button type="submit" className="btn btn-dark mt-3">Login</button>
                </form>

                {errorMsg && <>
                    <div className='error-msg mt-3'>{errorMsg}</div>
                    <br></br>
                </>}
            </div>

            <Footer />
        </div>
    );
};

export default Login;