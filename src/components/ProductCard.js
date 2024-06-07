
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, quantity, handleQuantityChange, addToCart }) => {
  return (
    <div className="product-card-container">
      <img src={product.image} alt={product.title} />

      <div className="flex items-center justify-between mt-2">
        <h3 className="text-white font-bold text-lg h-7 overflow-hidden">{product.title}</h3>
        <p className="text-white font-bold text-lg">₹{product.price}/-</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="product-quantity-button"
          onClick={() => handleQuantityChange(product.id, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <p className="text-white font-medium m-0">{quantity}</p>
        <button
          className="product-quantity-button"
          onClick={() => handleQuantityChange(product.id, quantity + 1)}
        >
          +
        </button>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="product-add-cart-button"
          onClick={() => addToCart(product, quantity)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
