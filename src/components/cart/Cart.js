import React, { useEffect, useState } from 'react';
import { Products } from '../products/Products';
import { Navbar } from '../pages/Navbar';
import '../../assets/css/styles.css';
import Footer from '../pages/Footer';
import { auth, fs } from '../../config/Firebase';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { CartProducts } from './CartProducts';

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
    console.log(uid);

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



    // const AddToCart = async (product) => {
    //     if (uid != null) {
    //         console.log(product);
    //         Product = product;
    //         Product['qty'] = 1;
    //         Product['totalQty'] = Product.qty;
    //         await setDoc(doc(fs, 'tblBucket' + uid, Product.id), Product);

    //         console.log('successfully added to bucket');
    //     } else {
    //         navigate('/');
    //     }
    // }

    // let Product;
    // const AddToCart = async (product) => {
    //     if (uid != null) {

    //         Product = product;
    //         const docRef = doc(fs, "")



    //     } else {
    //         navigate('/');
    //     }
    // }

    return (
        <div>
            <Navbar userName={user} />

            <div>

                <header class="bg-dark py-5">
                    <div class="container px-4 px-lg-5 my-5">
                        <div class="text-center text-white">
                            <h1 class="display-4 fw-bolder">Shop in style</h1>
                            <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                        </div>
                    </div>
                </header>
                {/* <!-- Section--> */}
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

                {/* <!-- Bootstrap core JS--> */}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
                {/* <!-- Core theme JS--> */}
                <script src="js/scripts.js"></script>
            </div>

            <Footer />

        </div>
    );
};

export default Cart;