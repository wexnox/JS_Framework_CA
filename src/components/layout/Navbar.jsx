import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.jsx';
import { MdShoppingCart, MdMenu, MdClose } from 'react-icons/md';
import SearchBar from './SearchBar.jsx';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full shadow-sm">
            {/* Main Navbar Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4">
                    
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center transition-transform group-hover:scale-110">
                                <span className="text-white text-lg font-black italic">e</span>
                            </div>
                            <span className="text-xl font-bold tracking-tighter text-gray-900 hidden sm:block">Shop</span>
                        </Link>
                    </div>

                    {/* Center: Desktop Search - Visible from md up */}
                    <div className="hidden md:block flex-grow max-w-md mx-4 lg:mx-8">
                        <SearchBar />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 sm:gap-4">
                        
                        {/* Desktop Links - Visible only on lg (1024px+) */}
                        <div className="hidden lg:flex items-center gap-6 mr-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-all hover:text-black hover:bg-gray-50 px-3 py-2 rounded-md ${
                                        location.pathname === link.path 
                                        ? 'text-black bg-gray-50' 
                                        : 'text-gray-500'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Cart & Toggle Group */}
                        <div className="flex items-center">
                            <Link to="/checkout" className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-all" aria-label="Cart">
                                <MdShoppingCart size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-black text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Toggle - Hidden on LG+ */}
                            <button 
                                className="lg:hidden p-2 ml-1 text-gray-700 hover:bg-gray-100 rounded-md transition-colors" 
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search - Visible only on mobile (< 768px) */}
            <div className="md:hidden px-4 pb-3">
                <SearchBar />
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[100] bg-white pt-20">
                    <div className="flex flex-col p-6 h-full">
                        <div className="flex justify-end mb-8">
                             <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <MdClose size={28} />
                             </button>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.path}
                                    to={link.path} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-4xl font-black uppercase tracking-tighter py-4 border-b border-gray-50 ${
                                        location.pathname === link.path ? 'text-black' : 'text-gray-300'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto pb-10">
                             <Link 
                                to="/checkout" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-3 w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest"
                             >
                                <MdShoppingCart size={24} />
                                View Cart ({cartCount})
                             </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;