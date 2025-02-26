import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ProductPage = ({ products, addToCart }) => {
    const router = useRouter();
    const { id } = router.query;
    const product = products.find(p => p.id.toString() === id);
    const [quantity, setQuantity] = useState(1);

    if (!product) return <p>Product not found</p>;

    return (
        <div className="product-page">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <input type="number" value={quantity} min="1" onChange={e => setQuantity(parseInt(e.target.value) || 1)} />
            <button onClick={() => addToCart(product, quantity)}>🛒 Add to Cart</button>
        </div>
    );
};

export default ProductPage;