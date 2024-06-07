
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import './Checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useContext(ProductContext);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="checkout-main-container">
      <h2 className="font-bold text-xl m-0 mb-3">Checkout</h2>
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
        <div className="w-full">
          {cart.map((product) => (
            <div key={product.id} className="checkout-item">
              <img src={product.image} alt={product.title} />
              <div className="flex justify-between w-4/5 items-center">
                <h3 className="font-medium text-lg m-0">{product.title}</h3>
                <p className="font-medium text-lg m-0">
                  Price: ₹{product.price}
                </p>
                <p className="font-medium text-lg m-0">
                  Qty: {product.quantity}
                </p>
              </div>
            </div>
          ))}
          <h3 className="font-bold text-xl m-0">
            Total Price: ₹{getTotalPrice()}
          </h3>
          <Link to="/payment">
            <button
              className="product-add-cart-button !px-4 mt-2"
              onClick={() => alert("Order placed!")}
            >
              Confirm Order
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
