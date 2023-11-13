import Link from 'next/link';
import { logout, reset } from '@/src/features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsLoggedIn(user);
  }, [isLoggedIn, user]);

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    window.location.reload()
  };
  return (
    <div>
      <nav
        className='navbar  navbar-expand-lg bg-body-tertiary   '
        style={{ backgroundColor: '#e4ce51' }}
      >
        <div className='container-fluid'>
          <div></div>
          <Link className='navbar-brand' href='/'>
            J-CASSY PRODUCTS <br />
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                J-CASSY PRODUCTS
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item'>
                  <Link
                    href='/'
                    className='nav-link active'
                    aria-current='page'
                  >
                    HOME
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link href='/cart' className='nav-link'>
                    CART
                  </Link>
                </li>
                <li className='nav-item'>
                  {isLoggedIn ? (
                    <Link href='/login' className='nav-link' onClick={onClick}>
                      LOGOUT
                    </Link>
                  ) : (
                    <Link href='/login' className='nav-link'>
                      LOGIN
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
