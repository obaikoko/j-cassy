import Head from 'next/head';
// import styles from '@/styles/Home.module.css';
import ProductForm from '@/components/ProductForm';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { loadProducts } from '@/src/features/products/productSlice';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const dispatch = useDispatch();
  const [goods, setGoods] = useState('');
  const { products, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isSuccess) {
      setGoods(products);
    }
    dispatch(loadProducts());
  }, [goods, isError, isSuccess, message]);
  return (
    <>
      <Head>
        <title>J-CASSY</title>
      </Head>
      <main>
        <h1 className='text-center'>NEW PRODUCTS</h1>
        <div className='ProductForm d-flex justify-content-center m-3 p-3'>
          <ProductForm />
        </div>

        <div className='row row-cols-1 row-cols-md-3 g-1'>
          {goods ? (
            goods.map((good) => <ProductCard key={good._id} good={good} />)
          ) : (
            <>
              <h1>No Products to display</h1>
            </>
          )}
        </div>
      </main>
    </>
  );
}
