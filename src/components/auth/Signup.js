import React, { useState } from 'react';
import Navbar from '../pages/Navbar';
import { Link } from "react-router-dom";
import { auth, fs } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Footer from '../pages/Footer';

export const Signup = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    const handleSignup = (e) => {
        e.preventDefault();
        console.log(fullName, email, password, userType);
        createUserWithEmailAndPassword(auth, email, password).then(
            async (userCredential) => {
                const ref = doc(fs, "tblUsers", userCredential.user.uid)
                const docRef = await setDoc(ref, {
                    FullName: fullName,
                    Email: email,
                    Password: password,

                    UserType: userType
                }).then(() => {
                    setSuccessMsg('Signup Succesful. You will now redirected to Login');
                    setFullName('');
                    setEmail('');
                    setPassword('');
                    setUserType('');
                    setErrorMsg('');
                    setTimeout(() => {
                        setSuccessMsg('');
                        navigate('/login')
                    }, 3000)
                }).catch(error => setErrorMsg(error.message));
            }).catch((error) => {
                setErrorMsg(error.message)
            })
    }
    return (

        <div>

            <Navbar />
            <div className='container col-4 mt-5'>

                <h1> Sign Up</h1>
                <hr />

                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>}


                <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
                    <div class="mb-3">
                        <label class="form-label">Full Name</label>
                        <input type="text" className="form-control" required
                            onChange={(e) => setFullName(e.target.value)} value={fullName} />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="form3Example3">User Type</label>

                        <div class="dropdown">
                            <select class="form-select" aria-label="Default select example" value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <option value="Admin">Admin</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="User">User</option>
                            </select>

                        </div>
                    </div>

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
                        <span> Already has an account? Login <Link to="/login" className='link'>here</Link>
                        </span>
                    </div>

                    <button type="submit" className="btn btn-dark mt-3">Register</button>
                </form>
                {errorMsg && <>
                    <div className='error-msg mt-3'>{errorMsg}</div>
                </>}

            </div>

            <Footer />
        </div>
    );
};

export default Signup;