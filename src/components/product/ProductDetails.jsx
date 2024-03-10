import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from "../../settings/constants.js";
import { CartContext } from '../../context/CartContext.jsx';

function ProductDetail() {
    const { addToCart } = useContext(CartContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const emptyStar = "☆";
    const filledStar = "⭐";

    useEffect(() => {
        axios.get(`${API_BASE_URL}/${productId}`).then(response => {
            setProduct(response.data);
        }).catch(error => {
            console.error('Error fetching product details:', error);
        });
    }, [productId]);

    if (!product) return 'Loading...';

    const stars = Array.from({ length: 5 }).map((_, i) => i < product.rating ? filledStar : emptyStar);

    return (
        <div className="bg-white rounded overflow-hidden shadow-lg mx-auto my-10 max-w-lg md:max-w-2xl" style={{ marginTop: '5rem' }}>
            <img className="w-full h-64 md:h-72 object-cover object-center" src={product.imageUrl} alt={`Image of ${product.title}`} />
            <div className="px-6 py-4">
                <h2 className="font-bold text-2xl mb-2">{product.title}</h2>
                <div className="font-semibold text-lg text-blue-600 mb-2">Price: ${product.price.toFixed(2)}</div>
                <div className="font-semibold text-lg text-red-600 mb-2">Discounted Price:
                    ${product.discountedPrice.toFixed(2)}</div>
                <p className="text-gray-700 text-base">
                    {product.description}
                </p>
                <button
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 mb-6 rounded"
                    onClick={() => addToCart(product)}>
                    Buy Now
                </button>
                <div className="flex items-center mt-2">
                    <div className="font-bold mr-2">Rating:</div>
                    <div>{stars.join(" ")}</div>
                </div>

                <div>
                    <h4 className="font-bold mt-4 mb-2">Tags:</h4>
                    {product.tags.map((tag, index) => (
                        <span key={index}
                              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag}</span>
                    ))}
                </div>

                <div>
                    <h4 className="font-bold mt-4 mb-2">Reviews:</h4>
                    {product.reviews.map((review, index) => (
                        <div key={index} className="border px-4 py-3 rounded-lg mb-2">
                            <h5 className="font-bold">{review.username}</h5>
                            <div>Rating: {review.rating}</div>
                            <div>{review.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;