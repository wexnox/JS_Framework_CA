import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../settings/constants.js";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {Link} from "react-router-dom"; // Importing icons

export default function Slider() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(API_BASE_URL)
            .then((response) => {
                setData(response?.data ?? []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Something went wrong!', error);
                setError(error);
                setIsLoading(false);
            });
    }, []);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % data.length); // Changed to increment by 1 for smoother scrolling
    };

    const handlePrevious = () => {
        setCurrentIndex((currentIndex - 1 + data.length) % data.length); // Changed to decrement by 1 for smoother scrolling
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong!</div>;
    }

    // Get a slice of products to display, ensuring it always contains 3 items by adding placeholders if necessary
    let visibleProducts = data.slice(currentIndex, currentIndex + 3);
    while (visibleProducts.length < 3) {
        visibleProducts.push(null); // Add null placeholders to maintain the layout
    }

    if (Array.isArray(data) && data.length) {
        return (
            <div className="flex items-center justify-center mt-10">
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-150" onClick={handlePrevious}>
                    <FiChevronLeft size="24" />
                </button>
                <div className="flex justify-center items-center space-x-4"> {/* Adjusted for center alignment */}
                    {visibleProducts.map((product, index) => (
                        product ? (
                            <Link to={`/product/${product.id}`} key={index}>
                                <div className="w-64 h-96 flex-none rounded overflow-hidden shadow-lg bg-white">
                                    <div className="w-full h-2/3 bg-gray-200 flex items-center justify-center">
                                        <img className="max-w-full max-h-full" src={product.imageUrl} alt={`Image of ${product.title}`} />
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{product.title}</div>
                                        <p className="text-gray-700 text-base">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div key={index} className="w-64 h-96 flex-none">

                            </div>
                        )
                    ))}
                </div>
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-150" onClick={handleNext}>
                    <FiChevronRight size="24" />
                </button>
            </div>
        );
    } else {
        return <div>No data is available</div>;
    }
}
