import React from 'react';
import Link from 'next/link';

const CartPage = ({ cart = [], updateCart, checkout, error }) => {
    if (error) {
        return (
            <div className="cart-page">
                <h2>Your Cart</h2>
                <p>Error loading cart: {error.message}</p>
                <Link href="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map(item => (
                    <div key={item.id} className="cart-item">
                        <h3>{item.name}</h3>
                        <p>
                            {item.price_sign}
                            {item.price} x {item.quantity}
                        </p>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={e => updateCart(item.id, parseInt(e.target.value) || 1)}
                        />
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <>
                    <h3>
                        Total: $
                        {cart
                            .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
                            .toFixed(2)}
                    </h3>
                    <button onClick={checkout}>Checkout</button>
                    <Link href="/">Back to Home</Link>
                </>
            )}
        </div>
    );
};

export default CartPage;
