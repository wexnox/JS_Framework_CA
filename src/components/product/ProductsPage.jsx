import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../settings/constants.js';


function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the products from the API
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
                            <img className="w-full h-64 object-cover" src={product.imageUrl} alt={`Image of ${product.title}`} />
                        </Link>
                        <div className="p-6 flex-grow">
                            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                            {product.discountedPrice < product.price && (
                                <div className="text-sm font-semibold text-red-600 line-through my-1">${product.price.toFixed(2)}</div>
                            )}
                            <div className="font-bold text-lg text-blue-600">${product.discountedPrice.toFixed(2)}</div>
                            <div className="mt-4 mb-2 flex flex-wrap">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <Link to={`/product/${product.id}`} className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold text-center py-2 px-4 rounded">
                            View product
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;