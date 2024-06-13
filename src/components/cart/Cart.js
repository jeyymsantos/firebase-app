import React, { useEffect, useState } from 'react';
import { Products } from '../products/Products';
import { Navbar } from '../pages/Navbar';
import '../../assets/css/styles.css';
import Footer from '../pages/Footer';
import { auth, fs } from '../../config/Firebase';
import { updateDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CartProducts } from './CartProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Cart = () => {

    const navigate = useNavigate();

    // GETTING USER ID
    function GetUserID() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }
    const uid = GetUserID();

    // GET CURRENT USER
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const userCollectionRef = doc(fs, 'tblUsers', user.uid);
                    const userSnapshot = await getDoc(userCollectionRef);
                    setUser(userSnapshot.data().FullName)
                } else {
                    setUser(null);
                }
            })
        }, [])
        return user;
    }
    const user = GetCurrentUser();

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const cartCollectionRef = collection(fs, 'tblCart ' + user.uid);
                onSnapshot(cartCollectionRef, (cartProd) => {
                    const newCartProduct = cartProd.docs.map((doc) => ({

                        ...doc.data(), id: doc.id

                    }))
                    setCartProducts(newCartProduct);
                })
            } else {
                console.log('user is not signed in to retrieve cart list')
            }
        })
    })


    // CART INCREASE
    let Product;
    const myCartProductIncrease = (myCartProduct) => {
        Product = myCartProduct;
        Product.qty = Product.qty + 1;

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const cartProd = doc(fs, 'tblCart ' + user.uid, Product.id);
                await updateDoc(cartProd, Product);
            } else {
                console.log("User is not logged in to perform this transaction");
            }
        })
    }

    // CART DECREASE
    const myCartProductDecrease = (myCartProduct) => {
        Product = myCartProduct;
        Product.qty = Product.qty - 1;

        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const cartProd = doc(fs, 'tblCart ' + user.uid, Product.id);
                await updateDoc(cartProd, Product);
            } else {
                console.log("User is not logged in to perform this transaction");
            }
        })
    }

    // Method to calculate total quantity
    const getTotalQuantity = () => {
        return cartProducts.reduce((total, product) => total + product.qty, 0);
    };

    const totalQuantity = getTotalQuantity();

    // Method to calculate total amount
    const getTotalAmount = () => {
        return cartProducts.reduce((total, product) => total + (product.qty * product.price), 0);
    };

    const totalAmount = getTotalAmount();

    //State of Total Products
    const [totalProducts, setTotalProducts] = useState(0);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                const qtyCollection = collection(fs, 'tblCart ' + user.uid)
                onSnapshot(qtyCollection, (qtySnapshot) => {
                    const qty = qtySnapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    }, [])

    return (
        <div>
            <Navbar userName={user} totalProducts={totalProducts} />

            {/* 
           <div>

                <header class="bg-dark py-5">
                    <div class="container px-4 px-lg-5 my-5">
                        <div class="text-center text-white">
                            <h1 class="display-4 fw-bolder">Shop in style</h1>
                            <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                        </div>
                    </div>
                </header>
         
                <section class="py-5">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {cartProducts.length > 0 ? (
                                <CartProducts myCartProducts={cartProducts} />
                            ) :
                                (
                                    <h1> No Items to Show </h1>
                                )}


                        </div>
                    </div>
                </section>

              
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
          
                <script src="js/scripts.js"></script>
            </div> */}

            <section class="h-100 h-custom">
                <div class="container h-100 py-5">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col">

                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="h5">Cart</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartProducts.length > 0 ? (
                                            <CartProducts myCartProducts={cartProducts} myCartProductIncrease={myCartProductIncrease} myCartProductDecrease={myCartProductDecrease} />
                                        ) :
                                            (
                                                <h1> No Items to Show </h1>
                                            )}


                                    </tbody>
                                </table>
                            </div>

                            <div class="card shadow-2-strong mb-5 mb-lg-0" style={{ borderRadius: '16px' }}>
                                <div class="card-body p-4">

                                    <div class="row">
                                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">


                                            <div class="d-flex justify-content-between" style={{ fontWeight: '500' }}>
                                                <p class="mb-2">Total Quantity:</p>
                                                <p class="mb-2">{totalQuantity}</p>
                                            </div>

                                        </div>
                                        <div class="col-md-6 col-lg-4 col-xl-6"></div>
                                        <div class="col-lg-4 col-xl-3">
                                            <div class="d-flex justify-content-between" style={{ fontWeight: '500' }}>
                                                <p class="mb-2">Subtotal</p>
                                                <p class="mb-2">-</p>
                                            </div>

                                            <div class="d-flex justify-content-between" style={{ fontWeight: '500' }}>
                                                <p class="mb-0">Shipping</p>
                                                <p class="mb-0">-</p>
                                            </div>

                                            <hr class="my-4" />

                                            <div class="d-flex justify-content-between mb-4" style={{ fontWeight: '500' }}>
                                                <p class="mb-2">Total</p>
                                                <p class="mb-2">{totalAmount}</p>
                                            </div>

                                            <button type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block btn-lg">
                                                <div class="d-flex justify-content-between">
                                                    <span>Pay</span> 
                                                    <span>ment</span>
                                                </div>
                                            </button>

                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default Cart;