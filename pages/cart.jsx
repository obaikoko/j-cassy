import CartItem from '@/components/CartItem';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function cart() {
  const [products, setProducts] = useState('');
  const goods = useSelector((state) => state.cart.cartItem);

  useEffect(() => {
    setProducts(goods);
  }, [goods]);

  return (
    <div className='container mt-4'>
      <h2>Shopping Cart</h2>
      <div className='row justify-content-between container'>
        <div className='col-2'>Image</div>
        <div className='col-2'>Product</div>
        <div className='col-2'>Price</div>
        <div className='col-2'>Quantity</div>
        <div className='col-2'>Total</div>
      </div>
      <div>
        {products ? (
          <>
            {products.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </>
        ) : (
          <>
            <h1>no Product in the cart</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default cart;
