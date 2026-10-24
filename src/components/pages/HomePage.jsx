import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../settings/constants.js';

function HomePage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_BASE_URL);
                const fetchedProducts = response.data.data;
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    if (isLoading) return <div className="text-center mt-10">Loading products...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error loading products.</div>;

    return (
        <>
            <Helmet>
                <title>Home - eShop</title>
                <meta name="description" content="Welcome to our eCom store! Browse our wide range of products." />
            </Helmet>
            <div className="container mx-auto px-4 py-12">
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold mb-4 text-gray-900 tracking-tight">New Arrivals</h1>
                    <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">Explore our latest collection</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                    {filteredProducts.map(product => {
                        const discount = product.price - product.discountedPrice;
                        const hasDiscount = discount > 0;
                        const discountPercentage = hasDiscount ? Math.round((discount / product.price) * 100) : 0;

                        return (
                            <article key={product.id} className="group flex flex-col">
                                <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-3 block" aria-label={`View details for ${product.title}`}>
                                    <img
                                        src={product.image?.url}
                                        alt=""
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {hasDiscount && (
                                        <div className="absolute top-2 left-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-tighter">
                                            -{discountPercentage}%
                                        </div>
                                    )}
                                </Link>
                                
                                <div className="flex flex-col flex-grow">
                                    <h2 className="text-[13px] font-medium text-gray-900 mb-1 line-clamp-1 uppercase tracking-tight">{product.title}</h2>
                                    
                                    <div className="flex items-baseline gap-2 mt-auto">
                                        <span className={`text-[13px] font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                                            ${product.discountedPrice.toFixed(2)}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-[11px] text-gray-400 line-through">${product.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-700 text-lg mt-12" role="status">No products found for "{searchTerm}"</p>
                )}
            </div>
        </>
    );
}

export default HomePage;