import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import AddToCartPopup from './AddToCartPopup';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [popupMessage, setPopupMessage] = useState(null);

    useEffect(() => {
        const brands = ['clinique', 'elf', 'maybelline', 'revlon', 'covergirl'];
        const fetchPromises = brands.map(brand =>
            fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)
                .then(res => res.json())
        );

        Promise.all(fetchPromises)
            .then(brandProducts => setProducts(brandProducts.flat()))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setPopupMessage(`${product.name} has been added to cart!`);
    };

    const handleSearch = (e) => setSearchQuery(e.target.value);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <header>
                <Link href="/">
                    <img src="/logo.png" alt="Your Logo" className="logo" />
                </Link>
                <Link href="/cart">
                    <button className='but-cart'>
                        Cart <FaShoppingCart /> ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </button>
                </Link>
            </header>

            <div className="products">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className='input1'
                />
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            <Link href={`/product/${product.id}`}>
                                <img className='prod-img' src={product.image_link} alt={product.name} />
                            </Link>
                            <h3 className='p-name'>{product.name}</h3>
                            <div className='price-div'>
                                <p className='p-price'>{product.price_sign}{product.price}</p>
                                <div>
                                    <Link href={`/product/${product.id}`}>
                                        <button className='but'><FaEye /></button>
                                    </Link>
                                    <button className='but' onClick={() => addToCart(product)}>
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddToCartPopup message={popupMessage} />
        </div>
    );
};

export default HomePage;
