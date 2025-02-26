import React from 'react';
import Link from 'next/link';

const HomePage = ({ products, addToCart, searchQuery, handleSearch }) => (
    <div className="products">
        <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
        />
        <div className="product-grid">
            {products.map(product => (
                <div className="product-card" key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <Link href={`/product/${product.id}`}><button>👁️</button></Link>
                    <button onClick={() => addToCart(product)}>🛒</button>
                </div>
            ))}
        </div>
    </div>
);

export default HomePage;