import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProduct,
  updateProduct,
} from '@/src/features/products/productSlice';
import { toast } from 'react-toastify';
const updateProductForm = ({ product, id }) => {
  const [fileInput, setFileInput] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
  });
  const { title, description, category, price } = formData;
  const { isError, message } = useSelector((state) => state.products);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setFileInput(e.target.value);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      description,
      category,
      price,
      photo: previewSource,
    };

    dispatch(updateProduct({ productData, productId: id }));

    if (isError) {
      toast.error(message);
    }
    //   setFormData({
    //     title: '',
    //     description: '',
    //     category: '',
    //     price: '',
    //   });
  };
  return (
    <>
      <button
        type='button'
        className='btn text-success mr-2'
        data-bs-toggle='modal'
        data-bs-target='#updateProduct'
      >
        <div>
          <div> Update Product</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='updateProduct'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Update Existing Product
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    id='title'
                    value={title}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Description
                  </label>
                  <input
                    type='text'
                    name='description'
                    id='description'
                    value={description}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='price' className='form-label'>
                    Price
                  </label>
                  <input
                    type='text'
                    name='price'
                    id='price'
                    value={price}
                    onChange={onChange}
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='category' className='form-label'>
                    Category
                  </label>
                  <select
                    name='category'
                    id='category'
                    className='form-select'
                    onChange={onChange}
                  >
                    <option value=''>select category</option>
                    <option value='Men'>Men </option>
                    <option value='Women'>Women </option>
                    <option value='Unisex'>Unisex </option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label htmlFor='fileInput' className='form-label'>
                    Image
                  </label>
                  <input
                    type='file'
                    id='fileInput'
                    onChange={handleInputChange}
                    value={fileInput}
                    className='form-control'
                  />
                </div>

                <div>
                  {previewSource && (
                    <img src={previewSource} alt='' className='img-fluid' />
                  )}
                </div>
                <button
                  className='btn btn-secondary'
                  type='submit'
                  data-bs-dismiss='modal'
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default updateProductForm;
