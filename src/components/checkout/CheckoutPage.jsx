import React, {useContext } from 'react';
import {CartContext} from "../../context/CartContext.jsx";
import { useNavigate } from 'react-router-dom';
import { MdRemoveShoppingCart, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'; // Import icons

function CheckoutPage() {

    const { cart, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const handleCheckout = () => {
        clearCart(); // This function is now properly accessed
        navigate("/checkout-success");
    };

    return (

        <div className="min-w-screen min-h-screen bg-gray-50 py-5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600 mb-8">Checkout</h1>
                    {cart.map((item, index) => (
                        <div key={item.id || index}
                             className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
                            <img className="w-16 h-16 rounded mr-4" src={item.image} alt={item.title}/>
                            <div className="flex-grow">
                                <h6 className="font-semibold text-gray-600">{item.title}</h6>
                                <div className="flex items-center">
                                    <MdRemoveCircleOutline className="text-red-500 cursor-pointer"
                                                           onClick={() => decreaseQuantity(item.id)}/>
                                    <span className="mx-2">x {item.quantity}</span>
                                    <MdAddCircleOutline className="text-green-500 cursor-pointer"
                                                        onClick={() => increaseQuantity(item.id)}/>
                                </div>
                            </div>
                            <span className="font-semibold text-gray-600 text-xl">${item.price.toFixed(2)}</span>
                            <MdRemoveShoppingCart className="text-red-500 cursor-pointer ml-4"
                                                  onClick={() => removeItem(item.id)}/>
                        </div>
                    ))}
                    <div className="text-xl font-semibold mt-4">
                        Total: <span className="text-gray-600">${total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                        PAY NOW
                    </button>
                </div>
            </div>
        </div>

    );
}

export default CheckoutPage;