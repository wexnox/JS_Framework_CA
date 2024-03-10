import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../settings/constants.js';
import {CartContext} from "../../context/CartContext.jsx";

function Products() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map(product => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img className="w-full h-64 object-cover" src={product.imageUrl}
                                 alt={`Image of ${product.title}`}/>
                        </Link>
                        <div className="p-6 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                            {product.discountedPrice < product.price && (
                                <div
                                    className="text-sm font-semibold text-red-600 line-through my-1">${product.price.toFixed(2)}</div>
                            )}
                            <div className="font-bold text-lg text-blue-600">${product.discountedPrice.toFixed(2)}</div>
                            <div className="mt-4 mb-2 flex flex-wrap">
                                {product.tags.map((tag, index) => (
                                    <span key={index}
                                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <button
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 mb-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
                            onClick={() => addToCart(product)}
                        >
                            <svg className="inline-block mr-2 -mt-1 h-5 w-5" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Buy Now
                        </button>

                        <Link to={`/product/${product.id}`}
                              className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-center py-2 px-4 rounded">
                            View product
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;