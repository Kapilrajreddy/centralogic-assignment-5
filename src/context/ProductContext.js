import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilters, setCategoryFilters] = useState({
    Men: true,
    Women: true,
    Kids: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
        );
        const data = await response.json();

        console.log(data);

        setCategories(data.categories);
        setProducts(
          data.categories.flatMap((category) => category.category_products)
        );
        setFilteredProducts(
          data.categories.flatMap((category) => category.category_products)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const filterProducts = (searchTerm, categoryFilters) => {
    let filtered = categories.flatMap((category) => {
      if (categoryFilters[category.category_name]) {
        return category.category_products;
      }
      return [];
    });

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, categoryFilters);
  };

  const handleCategoryFilter = (category) => {
    const updatedFilters = {
      ...categoryFilters,
      [category]: !categoryFilters[category],
    };
    setCategoryFilters(updatedFilters);
    filterProducts(searchTerm, updatedFilters);
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        searchTerm,
        categoryFilters,
        handleSearch,
        handleCategoryFilter,
        addToCart,
        updateCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
