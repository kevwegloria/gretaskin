import Link from 'next/link';
import React from 'react';

const CheckoutModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Checkout Successful!</h2>
                <p>Thank you for your purchase.</p>
                <Link href="/"> <button>Home</button></Link>
               
            </div>
        </div>
    );
};

export default CheckoutModal;