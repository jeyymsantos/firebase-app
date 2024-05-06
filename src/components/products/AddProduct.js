import React, { useState } from 'react';
import { storage, fs } from '../../config/Firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import Navbar from '../pages/Navbar';
import { Link } from "react-router-dom";
import Footer from '../pages/Footer';

export const AddProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [image, setImage] = useState(null);

    const [imageError, setImageError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const productsCollectionRef = collection(fs, 'tblProducts');
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const handleProductsImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile&&types.includes(selectedFile.type)) {
                setImage(selectedFile);
                setImageError('');
            } else {
                setImage(null);
                setImageError('Please select a valid file type(png or jpg)');
            }
        } else {
            console.log('Please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault();
        if (image != null) {
            const imgRef = ref(storage, `tblProducts/${image.name}`);
            uploadBytes(imgRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    addDoc(productsCollectionRef, {
                        prodTitle: title,
                        prodDesc: description,
                        prodPrice: Number(price),
                        ProdQty: Number(qty),
                        prodURL: url,
                        timestamp: serverTimestamp()
                    }).then(() => {
                        setSuccessMsg('Product added successfully!');
                        setTitle('');
                        setDescription('');
                        setPrice('');
                        setQty('');
                        document.getElementById('file').value = '';
                        setImageError('');
                        setUploadError('');
                        setTimeout(() => {
                            setSuccessMsg('');
                        }, 3000)
                    }).catch(error => setUploadError(error.message));
                });
            })
        }
    }

    return (
        <div>
            <Navbar />

            <div className='container col-4 mt-5'>

                <h1>Add Product</h1> <br />

                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                    <br></br>
                </>}

                <form className='form-group' autoComplete='off' onSubmit={handleAddProducts}>
                    <div class="mb-3">
                        <label class="form-label">Product Title</label>
                        <input type="text" className="form-control" required
                        onChange={(e) => setTitle(e.target.value)} value={title}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Description</label>
                        <textarea type="text" className="form-control" required
                        onChange={(e) => setDescription(e.target.value)} value={description}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Price</label>
                        <input type="number" className="form-control" required
                        onChange={(e) => setPrice(e.target.value)} value={price}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Product Quantity</label>
                        <input type="number" className="form-control" required
                        onChange={(e) => setQty(e.target.value)} value={qty}
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Upload Product Image</label>
                        <input type="file" className="form-control" required
                        onChange={handleProductsImg}
                        />

                        {imageError&&<>
                        <br />
                        <div className='error-msg'> {imageError} </div>
                        
                        </>}
                    </div>


                    <button type="submit" className="btn btn-dark mt-3">Save</button>
                </form>
                {uploadError&&<>
                        <br />
                        <div className='error-msg'> {uploadError} </div>
                        
                        </>}
            </div>

            <Footer />
        </div>
    );
};

export default AddProduct;