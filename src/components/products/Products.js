import React, { useEffect, useState } from 'react';
import { fs } from '../../config/Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { ProductView } from './ProductView';

const productCollectionRef = collection(fs, 'tblProducts');

export const Products = ({ addToCart }) => {

    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const productsData = await getDocs(productCollectionRef);
        setProducts(productsData.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        })));
    }

    useEffect(() => {
        getProducts();
    }, []);


    return products.map((product) => (
        <div>
            {products.length > 0 && (
                <ProductView product={product} addToCart={addToCart} />
            )}
            {products.length < 1 && (
                <h1> Please wait...</h1>
            )}
        </div>
    ));
};

export default Products;