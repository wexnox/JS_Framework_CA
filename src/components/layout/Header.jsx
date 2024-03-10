import React from 'react';
import Navbar from './Navbar.jsx';

const Header = ({ cartItems, products }) => {
    return (
        <header>
            <Navbar cartItems={cartItems} products={products} />
        </header>
    );
}

export default Header;