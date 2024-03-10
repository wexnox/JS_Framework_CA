import React, {useContext, useEffect} from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import { Link } from 'react-router-dom';

function CheckoutSuccessPage() {
    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-bold">Order Successful!</h2>
            <p className="mt-4">Thank you for your purchase.</p>
            <Link to="/products" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Back to Store</Link>
        </div>
    );
}

export default CheckoutSuccessPage;