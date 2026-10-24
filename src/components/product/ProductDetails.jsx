import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import axios from 'axios';
import { API_BASE_URL } from "../../settings/constants.js";
import { CartContext } from '../../context/CartContext.jsx';

function ProductDetail() {
    const { addToCart } = useContext(CartContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${API_BASE_URL}/${productId}`).then(response => {
            setProduct(response.data.data);
            setIsLoading(false);
        }).catch(error => {
            console.error('Error fetching product details:', error);
            setIsError(true);
            setIsLoading(false);
        });
    }, [productId]);

    if (isLoading) return <div className="text-center mt-10" role="status">Laster produktinformasjon...</div>;
    if (isError || !product) return <div className="text-center mt-10 text-red-700 font-bold" role="alert">Feil ved lasting av produktinformasjon.</div>;

    const discount = product.price - product.discountedPrice;
    const hasDiscount = discount > 0;
    const discountPercentage = hasDiscount ? Math.round((discount / product.price) * 100) : 0;

    return (
        <>
            <Helmet>
                <title>{product.title} - eShop</title>
                <meta name="description" content={product.description} />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <article className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100 max-w-5xl mx-auto">
                    <div className="md:w-5/12 lg:w-1/2 flex items-center justify-center bg-gray-50 p-4">
                        <img className="max-w-full max-h-[300px] md:max-h-[500px] object-contain transition-transform hover:scale-105" src={product.image?.url} alt="" />
                    </div>
                    <div className="md:w-7/12 lg:w-1/2 p-6 md:p-8 flex flex-col">
                        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 text-gray-900">{product.title}</h1>
                        <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">{product.description}</p>

                        <div className="mb-8">
                            {hasDiscount ? (
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-4">
                                        <span className="text-4xl font-bold text-red-700">${product.discountedPrice.toFixed(2)}</span>
                                        <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-2 text-green-700 font-bold flex items-center gap-2">
                                        <span className="bg-green-100 px-2 py-1 rounded text-sm">Du sparer ${discount.toFixed(2)} ({discountPercentage}%)</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</div>
                            )}
                        </div>

                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-8 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            onClick={() => addToCart(product)}>
                            Legg i handlevogn
                        </button>

                        <section className="border-t border-gray-100 pt-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Anmeldelser</h2>
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {product.reviews.map((review, index) => (
                                        <div key={review.id || index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-bold text-gray-900">{review.username}</span>
                                                <div className="text-yellow-500 flex" aria-label={`Vurdering: ${review.rating} av 5 stjerner`}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} aria-hidden="true">
                                                            {i < review.rating ? "★" : "☆"}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-700 italic">"{review.description}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Ingen anmeldelser for dette produktet ennå.</p>
                            )}
                        </section>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {product.tags && product.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}

export default ProductDetail;