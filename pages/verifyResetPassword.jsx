import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login, reset, verifyResetPassword } from '../src/features/auth/authSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

function verifyPassword() {
  const [formData, setFormData] = useState({ email: '', otp: '', password: '' });
  const { email, otp, password } = formData;

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
      navigate.push('/login');
    }
  }, [isSuccess, isError]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      otp,
      password,
    };

    console.log(userData);

    dispatch(verifyResetPassword(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='text-center'>Enter OTP</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Confirm Email</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='otp'>OTP</label>
                  <input
                    type='password'
                    name='otp'
                    className='form-control'
                    id='otp'
                    value={otp}
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>New Password</label>
                  <input
                    type='password'
                    name='password'
                    className='form-control'
                    id='password'
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <button type='submit' className='btn btn-primary my-3'>
                  submit
                </button>
              </form>
              <Link href='/resetPassword' className='text-decoration-none'>
                Forgotten password ?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default verifyPassword;
