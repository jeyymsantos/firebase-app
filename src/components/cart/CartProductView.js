import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fs } from '../../config/Firebase';
import { deleteDoc, doc } from "firebase/firestore";

export const CartProductView = ({ myCartProduct, myCartProductIncrease, myCartProductDecrease }) => {

    function handleCartDecrease(){
        myCartProductDecrease(myCartProduct);
    }

    const handleCartIncrease = () => {
        myCartProductIncrease(myCartProduct);
    }

    const handleCartProductRemove = () => {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                const cartProdRemove = doc(fs, 'tblCart ' + user.uid, myCartProduct.id);
                await deleteDoc(cartProdRemove);
                console.log('successfully deleted');
            }
        })
    }

    // Calculate sub-total for the product
    const subTotal = myCartProduct.qty * myCartProduct.prodPrice;

    return (
        <tr>
            <th scope="row">
                <div class="d-flex align-items-center">
                    <div class="card h-100">
                        <img src={myCartProduct.prodURL} class="img-fluid rounded-3"
                            style={{ width: '220px', height: '150px' }} alt="Book" />
                    </div>
                    <div class="flex-column ms-4">
                        <p class="mb-2">{myCartProduct.prodTitle}</p>
                        <p style={{ fontWeight: 200 }}>{myCartProduct.prodDesc}</p>
                        <p style={{ fontWeight: 200 }}>{myCartProduct.ProdQty} items</p>
                    </div>
                </div>
            </th>
            <td class="align-middle">
                <div class="d-flex flex-row">

                    <button class="btn btn-primary me-3" onClick={handleCartDecrease}> - </button>

                    <div class="mt-2"> {myCartProduct.qty} </div>

                    <button class="btn btn-primary ms-3" onClick={handleCartIncrease}> + </button>

                </div>
            </td>
            <td class="align-middle">
                <p class="mb-0" style={{ fontWeight: 500 }}>₱{myCartProduct.prodPrice}</p>
            </td>
            <td class="align-middle">
                <p class="mb-0" style={{ fontWeight: 500 }}>₱{subTotal}</p>
            </td>
            <td class="align-middle">
                <button class="btn btn-danger" onClick={handleCartProductRemove}> Remove </button>
            </td>
        </tr>
    )

};

export default CartProductView;