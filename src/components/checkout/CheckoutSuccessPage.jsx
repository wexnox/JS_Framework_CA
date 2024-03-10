import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center p-10 bg-white rounded-lg shadow-xl">
                <svg className="mx-auto mb-4 w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
                <p className="mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
                <Link to="/products"
                      className="inline-block px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-150">
                    Back to Store
                </Link>
            </div>
        </div>
    );
}

export default CheckoutSuccessPage;