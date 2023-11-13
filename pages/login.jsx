import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../src/features/auth/authSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useRouter();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      dispatch(reset());
    }
    if (user || isSuccess) {
      navigate.push('/');
    }
  }, [user, isError]);

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
      password,
    };

    dispatch(login(userData));
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
              <h4>Login</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label htmlFor='email'>Username</label>
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
                  <label htmlFor='password'>Password</label>
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
                  Login
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

export default Login;
