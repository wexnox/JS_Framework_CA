import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../context/CartContext.jsx";

function CheckoutSuccessPage() {
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <>
            <Helmet>
                <title>Success! - eShop</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-[60vh] bg-gray-50 px-4">
                <div className="text-center p-12 bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
                    <div className="mx-auto mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                        <svg className="w-14 h-14 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Your order was successful!</h1>
                    <p className="text-gray-700 text-lg mb-10 leading-relaxed">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>
                    <Link to="/"
                        className="inline-block w-full px-6 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] active:scale-[0.98]">
                        Back to the store
                    </Link>
                </div>
            </div>
        </>
    );
}

export default CheckoutSuccessPage;