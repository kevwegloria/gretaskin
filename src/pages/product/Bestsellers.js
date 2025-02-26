import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Bestsellers = () => {
    const [bestsellers, setBestsellers] = useState([]);

    useEffect(() => {
        // Fetch bestsellers from API or use a predefined list
        // For example, fetch products with a specific tag or category
        fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=BestSeller')
            .then(res => res.json())
            .then(data => {
                // Limit to a reasonable number of bestsellers
                setBestsellers(data.slice(0, 5));
            })
            .catch(error => console.error('Error fetching bestsellers:', error));
    }, []);

    if (bestsellers.length === 0) {
        return null; // Or a message like "No bestsellers available."
    }

    return (
        <div className="bestsellers">
            <h3>Bestsellers</h3>
            <div className="bestseller-grid">
                {bestsellers.map(product => (
                    <div key={product.id} className="bestseller-item">
                        <Link href={`/product/${product.id}`}>
                            <img src={product.image_link} alt={product.name} />
                            <p>{product.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bestsellers;