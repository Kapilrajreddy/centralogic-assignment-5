
import React, { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductContext } from '../context/ProductContext';
import { IoSearch } from "react-icons/io5";
import './ProductList.css';

const ProductList = () => {
  const {
    filteredProducts,
    searchTerm,
    categoryFilters,
    handleSearch,
    handleCategoryFilter,
    addToCart
  } = useContext(ProductContext);
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantity({ ...quantity, [id]: value });
  };

  return (
    <div className="product-list">
      <div className="search-container">
        <div className="search-sub-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-bar"
          />
          <IoSearch style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <div className="filters">
          <h3 className=" text-black font-bold text-2xl">Categories:</h3>
          {Object.keys(categoryFilters).map((category) => (
            <label key={category} className="flex items-center gap-4 text-xl">
              <input
                type="checkbox"
                checked={categoryFilters[category]}
                onChange={() => handleCategoryFilter(category)}
                className="check-box"
              />
              {category}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap  h-screen overflow-y-scroll no-scroll">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantity[product.id] || 1}
                handleQuantityChange={handleQuantityChange}
                addToCart={addToCart}
              />
            ))
          ) : (
            <div className="flex justify-center mx-auto w-screen">
              <img
                src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717632000&semt=sph"
                alt=""
                className="w-80 h-80"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
