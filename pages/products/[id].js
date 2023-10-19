import React from 'react';
import { useRouter } from 'next/router';
import UpdateProductForm from '@/components/UpdateProductForm';
import { useState, useEffect } from 'react';
import {
  deleteProduct,
  loadProduct,
  reset,
} from '@/src/features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState('');
  const [admin, setAdmin] = useState('');
  const { product, isSuccess } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(loadProduct(id));
      setAdmin(user);
    }

    setData(product);
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      setData(product);
    }
  }, [isSuccess, product]);

  const onClick = () => {
    console.log(id);
    dispatch(deleteProduct(id));
  };

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
                {admin && admin.role === 'Admin' ? (
                  <div className=''>
                    <button onClick={onClick} className='btn text-danger mr-2'>
                      Delete
                    </button>
                    <UpdateProductForm product={data} id={id} />
                  </div>
                ) : (
                  <></>
                )}
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
