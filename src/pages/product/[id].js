import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const ProductPage = ({ addToCart = (product) => console.warn("addToCart function not provided", product) }) => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bestsellers, setBestsellers] = useState([]);

    useEffect(() => {
        if (id) {
            fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setLoading(false);
                    fetchBestsellers();
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    const fetchBestsellers = () => {
        fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`)
            .then(res => res.json())
            .then(data => setBestsellers(data.slice(0, 10)))
            .catch(error => console.error('Error fetching bestsellers:', error));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-page-container">
            <div className='arrow'>
                <Link href="/" className='arrow'><FaArrowLeft /></Link>
            </div>

            <div className="product-details">
                <img src={product.image_link} alt={product.name} className='prod-pic' />
                <h2 className='prod-name-h2'>{product.name}</h2>
                <p className='prod-cost'>{product.price_sign}{product.price}</p>

                <Link href="/" className='back'>Back to Home</Link>
            </div>

            <div className="bestsellers-section">
                <h2>Bestsellers</h2>
                <div className="bestsellers-grid">
                    {bestsellers.map((item) => (
                        <div key={item.id} className="bestseller-item">
                            <img src={item.image_link} alt={item.name} className="bestseller-img" />
                            <h3>{item.name}</h3>
                            <p>{item.price_sign}{item.price}</p>
                            <Link href={`/product/${item.id}`} className='view-prod'>View Product</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
