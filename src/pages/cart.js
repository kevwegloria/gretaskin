import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CheckoutModal from './CheckoutModal';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Function to update the quantity of items in the cart
    const updateCart = (id, quantity) => {
        const updatedCart = cart
            .map(item => item.id === id ? { ...item, quantity } : item)
            .filter(item => item.quantity > 0);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const checkout = () => {
        setCart([]);
        localStorage.removeItem('cart');
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="cart-page">
            <h2 className='your-cart'>Your Cart</h2>
            <div className="my-cart">
                <div className="cart1">
                 <div className='cart-a'>
                 {cart.length === 0 ? (
                        <p className='empty'>Your cart is empty.</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div>
                                    <img className="item-img" src={item.image_link} alt={item.name} />
                                    <p>{item.price_sign}{item.price} x {item.quantity}</p>
                                    <input
                                    className='cart-input'
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={e => updateCart(item.id, parseInt(e.target.value) || 1)}
                                    />
                                </div>
                                <div>
                                    <h3 className="item-name">{item.name}</h3>
                                   
                                </div>
                                <div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        X
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {cart.length > 0 && (
                        < div className='total'>
                        <p>Total: </p>
                            <h3>
                             ${cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}
                            </h3>
                        </div>
                    )}
                 </div>
                </div>
                <div className="cart2">
                    <h3>Checkout</h3>
                  <div className='input-div'>
                  <input
                    placeholder='Jane Doe'
                    className='jane'
                    />
                    <input
                    placeholder='janedoe@gretaskin.com'
                    className='jane'
                    />
                    <input
                    placeholder='+234 803 778 5467'
                    className='jane'
                    />
                  </div>
                    <button onClick={checkout} className='checkout'>Checkout</button>
                    <Link href="/" className='continue'>Continue Shopping</Link>
                </div>
                <CheckoutModal isOpen={modalOpen} onClose={closeModal} />
            </div>
        </div>
    );
};

export default CartPage;
