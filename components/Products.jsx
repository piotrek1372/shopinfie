import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(token);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProducts();
  }, [token]);

  return (
    <div>
      <h1>Produkty</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} zł
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    padding: 10,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
});
