import React, { useEffect, useState } from 'react';
import { CartProductView } from './CartProductView';

export const CartProducts = ({ myCartProducts }) => {
    return myCartProducts.map((cartProduct) => (
        
      <CartProductView
        myCartProduct={cartProduct}
      />
    ));
  };