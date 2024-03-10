import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children, cartItems, products }) => {
    return (
        <>
            <Header cartItems={cartItems} products={products} />
            {children}
            <Footer />
        </>
    );
}

export default Layout;