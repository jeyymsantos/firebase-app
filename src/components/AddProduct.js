import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import Footer from './Footer';

export const AddProduct = () => {

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

                <h1>Add Product</h1> <br />

                <form className='form-group' autoComplete='off' onSubmit={handleSignin}>
                    <div class="mb-3">
                        <label class="form-label">Product Title</label>
                        <input type="text" className="form-control" required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Description</label>
                        <textarea type="text" className="form-control" required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Price</label>
                        <input type="number" className="form-control" required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Quantity</label>
                        <input type="number" className="form-control" required
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Upload Product Image</label>
                        <input type="file" className="form-control" required
                        />
                    </div>


                    <button type="submit" className="btn btn-dark mt-3">Save</button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default AddProduct;