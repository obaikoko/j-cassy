import CartItem from '@/components/CartItem';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/src/features/cart/cartSlice';
import style from '../styles/cart.module.css';

function cart() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState('');
  const goods = useSelector((state) => state.cart.cartItem);

  useEffect(() => {
    setProducts(goods);
  }, [goods]);

  const onClick = () => {
    dispatch(clearCart());
  };
  return (
    <div className='container mt-4'>
      <h2 className='text-center'>Shopping Cart</h2>

      <div className='row justify-content-between container'>
        <div className='col-2'>Image</div>
        <div className='col-2'>Product</div>
        <div className='col-2'>Price</div>
        <div className='col-2'>Quantity</div>
        <div className='col-2'>Total</div>
      </div>
      <div>
        {products && products.length < 1 ? (
          <>
            <h1>no Product in the cart</h1>
          </>
        ) : (
          <>
            {products &&
              products.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            <div className='d-flex justify-content-between'>
              <button className='btn btn-danger ' onClick={onClick}>
                Clear Cart
              </button>
              <div className='subTotal'>
                <div className='total d-flex justify-content-between'>
                  <h3>Subtotal</h3>
                  $
                </div>
                <p>amount for total products in the cart</p>
                <button className='btn btn-success'>check out</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default cart;
