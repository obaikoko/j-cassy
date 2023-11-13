import React from 'react';

function Showcase() {
  return (
    <div
      id='carouselExampleAutoplaying'
      className='carousel slide'
      data-bs-ride='carousel'
    >
      <div className='carousel-inner'>
        <div className='carousel-item active'>
          <img
            src='https://res.cloudinary.com/dzajrh9z7/image/upload/v1699893316/J-Cassy/bag1_xktidt.jpg'
            className='d-block w-100'
            alt='...'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://res.cloudinary.com/dzajrh9z7/image/upload/v1699893906/J-Cassy/close-up-of-clothes-hanging-in-row-739240657-5a78b11f8e1b6e003715c0ec_ynt9sf.jpg'
            className='d-block w-100'
            alt='...'
          />
        </div>
        <div className='carousel-item'>
          <img
            src='https://res.cloudinary.com/dzajrh9z7/image/upload/v1699894798/J-Cassy/2d4044c561b007e1d4e5562a0fc29282_vpuuhz.jpg'
            className='d-block w-100'
            alt='...'
          />
        </div>
      </div>
      <button
        className='carousel-control-prev'
        type='button'
        data-bs-target='#carouselExampleAutoplaying'
        data-bs-slide='prev'
      >
        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next'
        type='button'
        data-bs-target='#carouselExampleAutoplaying'
        data-bs-slide='next'
      >
        <span className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
}

export default Showcase;
