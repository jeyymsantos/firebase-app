import React, { useEffect, useState } from 'react';
import { CartProductView } from './CartProductView';

export const CartProducts = ({ myCartProducts, myCartProductIncrease, myCartProductDecrease }) => {
    return myCartProducts.map((cartProduct) => (
        
      <CartProductView
        myCartProduct={cartProduct} myCartProductIncrease={myCartProductIncrease} myCartProductDecrease={myCartProductDecrease}
      />
    ));
  };