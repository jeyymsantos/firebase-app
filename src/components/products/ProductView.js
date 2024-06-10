import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProductView = ({ product, addToCart }) => {

    const navigate = useNavigate();

    const SaveCart = () => {
        addToCart(product);
        navigate('/cart');
    }

    return (
        <div class="col mb-5">
            <div class="card h-100">
                {/* <!-- Product image--> */}
                <img class="card-img-top" src={product.prodURL} alt={product.prodTitle} />
                {/* <!-- Product details--> */}
                <div class="card-body p-4">
                    <div class="text-center">
                        {/* <!-- Product name--> */}
                        <h5 class="fw-bolder">{product.prodTitle}</h5>

                        {/* <!-- Product description--> */}
                        <p>{product.prodDesc}</p>

                        {/* <!-- Product price--> */}
                        ₱{product.prodPrice} | {product.ProdQty} items
                    </div>
                </div>
                {/* <!-- Product actions--> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">
                        <div class="nav-link" onClick={SaveCart}>Add to cart</div>
                    </a></div>
                </div>
            </div>
        </div>
    )
    
};

export default ProductView;