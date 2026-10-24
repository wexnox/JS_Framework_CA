import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../settings/constants.js';
import { MdSearch, MdClose } from 'react-icons/md';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products for search:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm.trim().length >= 1) {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
            setShowResults(true);
        } else {
            setFilteredProducts([]);
            setShowResults(false);
        }
    }, [searchTerm, products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (productId) => {
        setSearchTerm('');
        setShowResults(false);
        navigate(`/product/${productId}`);
    };

    return (
        <div ref={searchRef} className="relative flex-grow">
            <div className="relative">
                <label htmlFor="nav-search" className="sr-only">Search products</label>
                <input
                    type="text"
                    id="nav-search"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-10 py-2 bg-gray-100/50 border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white focus:border-gray-200 transition-all text-[13px] placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => searchTerm.trim().length >= 1 && setShowResults(true)}
                />
                <div className="absolute left-3.5 top-2.5 text-gray-400">
                    <MdSearch size={18} />
                </div>
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Clear search"
                    >
                        <MdClose size={18} />
                    </button>
                )}
            </div>

            {showResults && (
                <div className="absolute mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-[60] max-h-[450px] overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in-95 duration-200">
                    {filteredProducts.length > 0 ? (
                        <div className="py-2">
                            <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Products found</div>
                            <ul>
                                {filteredProducts.map(product => (
                                    <li key={product.id}>
                                        <button
                                            onClick={() => handleSelect(product.id)}
                                            className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-4 transition-colors group"
                                        >
                                            <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 group-hover:border-blue-200 p-1">
                                                <img src={product.image?.url} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-700">{product.title}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs font-black text-blue-600">${product.discountedPrice.toFixed(2)}</p>
                                                    {product.price > product.discountedPrice && (
                                                        <p className="text-[10px] text-gray-400 line-through">${product.price.toFixed(2)}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="px-6 py-8 text-center">
                            <MdSearch size={40} className="mx-auto text-gray-200 mb-2" />
                            <p className="text-sm text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
