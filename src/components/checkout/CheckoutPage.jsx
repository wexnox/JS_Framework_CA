import React, {useContext } from 'react';
import {CartContext} from "../../context/CartContext.jsx";
import { useNavigate } from 'react-router-dom'; // Replace useHistory
function CheckoutPage({ item }) {

    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const handleCheckout = () => {
        clearCart(); // This function is now properly accessed
        navigate("/checkout-success");
    };

    return (

        <div className="min-w-screen min-h-screen bg-gray-50 py-5">
            <div className="px-5">
                <div className="mb-2">
                    <a href="#" className="focus:outline-none hover:underline text-gray-500 text-sm"><i className="mdi mdi-arrow-left text-gray-400"></i>Back</a>
                </div>
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Checkout. dummy content</h1>
                </div>
                <div className="mb-5 text-gray-400">
                    <a href="#" className="focus:outline-none hover:underline text-gray-500">Home</a> / <a href="#" className="focus:outline-none hover:underline text-gray-500">Cart</a> / <span className="text-gray-600">Checkout</span>
                </div>
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            {/*List of item in cart*/}
                            {cart.map((item, index) => (
                            <div key={item.id || index} className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                <div className="w-full flex items-center">
                                    <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                        <img src={item.image} alt="Product Display"/>
                                    </div>
                                    <div className="flex-grow pl-3">
                                        <h6 className="font-semibold uppercase text-gray-600">{item.title}</h6>
                                        <p className="text-gray-400">x {item.quantity}</p>
                                    </div>
                                    <div>
                                        <span
                                            className="font-semibold text-gray-600 text-xl">${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Total</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold text-gray-400 text-sm">USD</span>
                                        <span className="font-semibold">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-5/12">
                            <div>
                                <button
                                    onClick={handleCheckout}
                                    className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                                    <i className="mdi mdi-lock-outline mr-1"></i>PAY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default CheckoutPage;