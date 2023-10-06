import React from 'react';
import Navbar from './Navbar';
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className=' py-2'></div>
      {children}
    </div>
  );
}

export default Layout;
