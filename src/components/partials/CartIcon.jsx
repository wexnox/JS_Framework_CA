import React, { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from '../../context/CartContext.jsx'; // Adjust the path as needed
import { Link } from 'react-router-dom';

export function CartIcon() {
    const { cart } = useContext(CartContext); // Destructure to directly get `cart` from the context
    const itemCount = cart.reduce((total, product) => total + product.quantity, 0);

    return (
        <Link to="/checkout">
            <div className="relative inline-block">
                <FiShoppingCart className="text-xl" />
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                </span>
            </div>
        </Link>
    );
}
