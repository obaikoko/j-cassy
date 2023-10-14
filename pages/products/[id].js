import React from 'react';
import { useRouter } from 'next/router';
import UpdateProductForm from '@/components/UpdateProductForm';
import { useState, useEffect } from 'react';
import { loadProduct, reset } from '@/src/features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');
  const { product, isSuccess } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(loadProduct(id));
    }

    setData(product);
  }, [id]);

  // Use another useEffect to set the data when the product is successfully loaded
  useEffect(() => {
    if (isSuccess) {
      setData(product);
    }
  }, [isSuccess, product]);

  return (
    <div className='container'>
      {data ? (
        <>
          <div className='row'>
            <div className='col-md-4'>
              <img
                src={data.image.url}
                alt={data.title}
                className='img-fluid'
              />
            </div>
            <div className='col-md-8'>
              <h2>{data && data.title}</h2>
              <p>Description: {data.description}</p>
              <p>Category: {data.category}</p>
              <p>Price: ${data.price}</p>
              <div className='mt-3 d-flex'>
                
                <div className=''>
                  Delete
                </div>
                <div className=''>
                  <UpdateProductForm product={data} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className='text-center'>Loading...</p>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
