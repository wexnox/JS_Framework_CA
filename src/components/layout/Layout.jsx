import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[100]">
                Hopp til hovedinnhold
            </a>
            <Header />
            <main id="main-content" className="flex-grow bg-gray-50">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;