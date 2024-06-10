import React, { useEffect, useState } from 'react';
import { Products } from './products/Products';
import { Navbar } from './pages/Navbar';
import '../assets/css/styles.css';
import Footer from './pages/Footer';
import { auth, fs } from '../config/Firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const navigate = useNavigate();

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

    let Product;
    const AddToCart = async (product) => {
        if (uid != null) {
            console.log(product);
            Product = product;
            Product['qty'] = 1;
            Product['totalQty'] = Product.qty;
            await setDoc(doc(fs, 'tblCart ' + uid, Product.id), Product);

            console.log('successfully added to bucket');
        } else {
            navigate('/');
        }
    }

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
                            <Products addToCart={AddToCart} />


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

export default Home;