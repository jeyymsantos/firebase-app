import React, { useState } from 'react';
import { storage, fs } from '../../config/Firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import Navbar from '../pages/Navbar';
import { Link } from "react-router-dom";
import Footer from '../pages/Footer';

export const AddLocation = () => {

    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [custodian, setCustodian] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const locationsCollectionRef = collection(fs, 'tblLocations');

    const handleAddLocation = (e) => {
        e.preventDefault();
        
        addDoc(locationsCollectionRef, {
            locCode: code,
            locDesc: description,
            locCustodian: custodian,
            timestamp: serverTimestamp()
        }).then(() => {
            setSuccessMsg('Location added successfully!');
            setCode('');
            setDescription('');
            setCustodian('');
            setUploadError('');
            setTimeout(() => {
                setSuccessMsg('');
            }, 3000)
        }).catch(error => setUploadError(error.message));

    }

    return (
        <div>
            <Navbar />

            <div className='container col-4 mt-5'>

                <h1>Add Location</h1> <br />

                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>}

                <form className='form-group' autoComplete='off' onSubmit={handleAddLocation}>
                    <div class="mb-3">
                        <label class="form-label">Code</label>
                        <input type="text" className="form-control" required
                            onChange={(e) => setCode(e.target.value)} value={code}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea type="text" className="form-control" required
                            onChange={(e) => setDescription(e.target.value)} value={description}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Custodian</label>
                        <textarea type="text" className="form-control" required
                            onChange={(e) => setCustodian(e.target.value)} value={custodian}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark mt-3">Submit</button>
                </form>
                {uploadError && <>
                    <br />
                    <div className='error-msg'> {uploadError} </div>

                </>}
            </div>

            <Footer />
        </div>
    );
};

export default AddLocation;