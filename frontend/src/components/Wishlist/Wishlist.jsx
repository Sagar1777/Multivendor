import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import styles from '../../styles/styles';
import { IoBagHandleOutline } from 'react-icons/io5';
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineAlert, AiOutlineHeart } from 'react-icons/ai';

const WishList = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: 'Iphone 14 pro max 256GB and 8 gb RAM',
      description: 'test',
      price: 99999,
    },
    {
      name: 'Iphone 14 pro max 256GB and 8 gb RAM',
      description: 'test',
      price: 99989,
    },
    {
      name: 'Iphone 14 pro max 256GB and 8 gb RAM',
      description: 'test',
      price: 98859,
    },
  ];

  return (
    <div className='fixed top-0 left-0 w-full bg-[#000000b4] h-screen z-10'>
      <div className='fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm'>
        <div>
          <div className='flex w-full justify-end pt-5 pr-5 fixed top-3 right-3'>
            <RxCross1
              size={25}
              className='cursor-pointer'
              onClick={() => setOpenWishlist (false)}
            />
          </div>

          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className='pl-2 text-[20px] font-[500]'>{cartData.length} items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className='w-full border-t'>
            {cartData &&
              cartData.map((item, index) => (
                <CartSingle key={index} data={item} />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>

      <RxCross1 className="cursor-pointer"
        />
        <img src='https://iqstoreindia.com/assets/images/iphone-14-pro/iphone-14-pro-max-deep-purple.png' alt=''
          className='w-[130px] h-min ml-2 mr-2 rounded-[5px]'
        />

        <div className='pl-[10px]'>
          <h1>{data.name}</h1>
          <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>
            NPR {totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
            />
        </div>
      </div>
    </div>
  );
};

export default WishList;
