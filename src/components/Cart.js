import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import './Cart.css';
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(ProductContext);

  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="cart-main-container">
      <h2 className="font-bold text-xl m-0">Cart</h2>
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mx-auto w-full">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp"
            alt=""
            className="w-80 h-80"
          />
          <Link to="/">
            {" "}
            <button className="product-add-cart-button">Shop Now</button>
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} />
              <div className="flex justify-between w-3/5">
                <h3 className="font-medium text-lg m-0">{product.title}</h3>
                <p className="font-medium text-lg m-0">
                  Price: ₹{product.price}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="product-quantity-button"
                    onClick={() => updateCartQuantity(product.id, -1)}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="product-quantity-button"
                    onClick={() => updateCartQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(product.id)}>
                  <RxCross2 className="cursor-pointer mr-2" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-end gap-2">
            <h3 className="font-bold text-xl m-0">
              Total Quantity: {getTotalQuantity()}
            </h3>
            <h3 className="font-bold text-xl m-0">
              Total Price: ₹{getTotalPrice()}
            </h3>
            <Link to="/checkout">
              <button className="product-add-cart-button !px-4">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
