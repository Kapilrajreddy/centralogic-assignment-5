
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const { cart } = useContext(ProductContext);

  const cartItemCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div className="navbar-main-container">
      <nav className="navbar-container">
        <Link to="/">
          <div className="navbar-logo-container">
            <img
              src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"
              alt=""
              className="navbar-logo"
            />
          </div>
        </Link>

        <div style={{display:"flex", alignItems:"center", gap:"30px"}}>
          <Link to="/cart" className="cart-container" >
            <FaShoppingCart className="cart-icon" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>
          <Link to="/checkout" className="checkout-text">
            <MdOutlineShoppingCartCheckout className="cart-icon"/>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
