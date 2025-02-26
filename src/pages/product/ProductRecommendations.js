import React from 'react';
import Link from 'next/link';

const ProductRecommendations = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) {
        return null; // Or a message like "No recommendations available."
    }

    return (
        <div className="product-recommendations">
            <h3 className='rec'>Recommendations</h3>
            {recommendations.map(product => (
                <div key={product.id} className="recommendation-item">
                    <Link href={`/product/${product.id}`}>
                        <img src={product.image_link} alt={product.name} />
                        <p className='rec-name'>{product.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductRecommendations;