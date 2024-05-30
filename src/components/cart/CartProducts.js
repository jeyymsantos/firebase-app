import React, { useEffect, useState } from 'react';
import { fs, auth } from '../../config/Firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { CartProductView } from './CartProductView';

export const CartProducts = () => {

    const [myCartProducts, setMyCartProducts] = useState([]);

    // Getting bucket products from FireStore Collection & Updating the State
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const cartCollectionRef = collection(fs, 'tblCart' + user.uid);
                onSnapshot(cartCollectionRef, (cartProd) => {
                    const newCartProduct = cartProd.docs.map((doc) => ({
                        ...doc.data(), id: doc.id
                    }));
                    setMyCartProducts(newCartProduct);
                })
            } else {
                console.log("user is not signed in to retrieve bucket list");
            }
        })
    }, [])

    return myCartProducts.map((myCartProduct) => (
        <div>
            {myCartProduct.length > 0 && (
                <CartProductView myCartProduct={myCartProduct} />
            )}
            {myCartProduct.length < 1 && (
                <h1> No Products to Show </h1>
            )}
        </div>
    ));
}