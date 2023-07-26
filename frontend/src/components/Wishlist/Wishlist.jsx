// Import necessary modules and dependencies
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addTocart } from "../../redux/actions/cart";

// Wishlist component
const Wishlist = ({ setOpenWishlist }) => {
  // Access the wishlist state from the Redux store
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // Function to remove an item from the wishlist
  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  // Function to add an item to the cart
  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 }; // Add a 'qty' property to the item
    dispatch(addTocart(newData));
    setOpenWishlist(false); // Close the wishlist modal after adding to the cart
  };

  return (
    // Wishlist Modal Container
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      {/* Wishlist Modal Content */}
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {/* Check if wishlist is empty */}
        {wishlist && wishlist.length === 0 ? (
          // Display message when wishlist is empty
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          // Render wishlist items if there are items in the wishlist
          <>
            <div>
              {/* Wishlist Header */}
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Display total number of wishlist items */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} items
                </h5>
              </div>

              {/* Display individual wishlist items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((item, index) => (
                    // Render each wishlist item using the CartSingle component
                    <CartSingle
                      key={index}
                      data={item}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// CartSingle component
const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  // Local state to manage the quantity of the item
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    // Wishlist Item Container
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        {/* Remove item from wishlist */}
        <RxCross1
          size={30} // Make the "x" icon bigger
          className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />
        {/* Display item image */}
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          {/* Display item name */}
          <h1>{data.name}</h1>
          {/* Display total price */}
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          {/* Add item to cart */}
          <BsCartPlus
            size={20} // Make the "cart plus" icon bigger
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
