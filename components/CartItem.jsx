import { useDispatch, useSelector } from 'react-redux';
import style from '../styles/cart.module.css';

import { removeFromCart } from '@/src/features/cart/cartSlice';
import { decreaseCartQty } from '@/src/features/cart/cartSlice';
import { addToCart } from '@/src/features/cart/cartSlice';

import { useState } from 'react';

function CartItem({ product }) {
  const dispatch = useDispatch();

  const removeItemFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const reduceItemQuantity = (product) => {
    dispatch(decreaseCartQty(product));
  };
  const increaseItemQuantity = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className='row mb-3 border mt-2 p-3 d-flex justify-content-between align-items-center'>
      <div className='col-2'>
        <img src={product.image.url} alt={product.name} className='img-fluid' />
        <button
          className={style.cartRemoveBtn}
          onClick={() => removeItemFromCart(product)}
        >
          remove
        </button>
      </div>
      <div className='col-2'>{product.title}</div>
      <div className='col-2'>${product.price}</div>
      <div className='col-2'>
        <div className={style.cartQty}>
          <button
            className={style.cartQtyBtn}
            onClick={() => reduceItemQuantity(product)}
          >
            -
          </button>
          {product.cartQuantity}
          <button
            className={style.cartQtyBtn}
            onClick={() => increaseItemQuantity(product)}
          >
            +
          </button>
        </div>
      </div>
      <div className='col-2'>${product.price * product.cartQuantity}</div>
    </div>
  );
}

export default CartItem;
