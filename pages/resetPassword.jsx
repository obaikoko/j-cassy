import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, resetPassword } from '../src/features/auth/authSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';


function changePassword() {
  const [formData, setFormData] = useState({ email: '' });
  const { email } = formData;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(reset());
    }
    if (isSuccess) {
      navigate.push('/verifyResetPassword');
      dispatch(reset())
    }
  }, [isSuccess, isError]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
    };

    console.log(userData);

    dispatch(resetPassword(userData));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='text-center'>Password Reset</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary my-4'>
                  submit
                </button>
              </form>
              <Link href='/login' className='text-decoration-none'>
                back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default changePassword;
