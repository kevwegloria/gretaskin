// components/AddToCartPopup.js

import React, { useState, useEffect } from 'react';

const AddToCartPopup = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Hide after 3 seconds
            return () => clearTimeout(timer); // Cleanup on unmount/re-render
        }
    }, [message]);

    if (!message || !isVisible) return null;

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '50px',
                right: '20px',
                background: ' #f41290',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                fontSize: '0.8rem',
                zIndex: 1000,
            }}
        >
            {message}
        </div>
    );
};

export default AddToCartPopup;