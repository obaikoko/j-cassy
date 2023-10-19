import React from 'react';
import style from '../styles/product.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/src/features/cart/cartSlice';
import Link from 'next/link';

function ProductCard({ good }) {
  const dispatch = useDispatch();
  const onClick = (good) => {
    dispatch(addToCart(good));
  };
  return (
    <div className={style.productCard}>
      <div className='m-4 border rounded  shadow p-4'>
        <div className='text-center'>
          <img
            src={good.image.url}
            alt={good.title}
            className='img-fluid  mb-3'
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <h3 className='text-primary'>{good.title}</h3>
        <p className='text-muted'>{good.description}</p>
        <p className='text-success'>Price: ${good.price}</p>
        <button className='btn btn-primary' onClick={() => onClick(good)}>
          Add to Cart
        </button>
        <Link href={`products/${good._id}`}>
          <button className='btn btn-light text-primary'>view</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
