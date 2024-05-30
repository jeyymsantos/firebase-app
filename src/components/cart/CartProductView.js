import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const CartProductView = ({ myCartProduct }) => {

    return (
        <div class="col mb-5">
            <div class="card h-100">
                {/* <!-- Product image--> */}
                <img class="card-img-top" src={myCartProduct.prodURL} alt={myCartProduct.prodTitle} />
                {/* <!-- Product details--> */}
                <div class="card-body p-4">
                    <div class="text-center">
                        {/* <!-- Product name--> */}
                        <h5 class="fw-bolder">{myCartProduct.prodTitle}</h5>

                        {/* <!-- Product description--> */}
                        <p>{myCartProduct.prodDesc}</p>

                        {/* <!-- Product price--> */}
                        ₱{myCartProduct.prodPrice} | {myCartProduct.ProdQty} items
                    </div>
                </div>
                {/* <!-- Product actions--> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">
                        <div class="btn btn-danger">Delete</div>
                    </a></div>
                </div>
            </div>
        </div>
    )
    
};

export default CartProductView;