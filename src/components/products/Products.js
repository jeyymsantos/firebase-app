import React, { useEffect, useState } from 'react';
import { fs } from '../../config/Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { ProductView } from './ProductView';

const productCollectionRef = collection(fs, 'tblProducts');

export const Products = () => {

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

    return (
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

                        {products.length > 0 && (
                            <ProductView products={products} />
                        )}
                        {products.length < 1 && (
                            <h1> Please wait...</h1>
                        )}

                    </div>
                </div>
            </section>

            {/* <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </div>
    );
};

export default Products;