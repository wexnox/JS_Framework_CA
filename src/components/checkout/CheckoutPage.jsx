import React, { useContext } from 'react';
import { CartContext } from "../../context/CartContext.jsx";
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { MdRemoveShoppingCart, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';

function CheckoutPage() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cart.reduce((acc, curr) => acc + curr.discountedPrice * curr.quantity, 0);

    const handleCheckout = () => {
        navigate("/checkout-success");
    };

    return (
        <>
            <Helmet>
                <title>Your Cart - eShop</title>
                <meta name="description" content="View your shopping cart and proceed to checkout." />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">Din handlevogn</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-2xl text-gray-600 mb-8">Handlevognen din er tom.</p>
                        <Link to="/" className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg inline-block focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Begynn å handle
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-4 mb-8">
                            {/* Header for larger screens */}
                            <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 rounded-lg font-bold text-gray-700 uppercase text-xs tracking-wider">
                                <div className="col-span-6">Produkt</div>
                                <div className="col-span-3 text-center">Antall</div>
                                <div className="col-span-2 text-right">Pris</div>
                                <div className="col-span-1"></div>
                            </div>
                            
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-12 items-center gap-4">
                                    <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                                        <img className="h-16 w-16 md:h-20 md:w-20 object-contain rounded-xl bg-gray-50" src={item.image?.url} alt="" />
                                        <div>
                                            <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight">{item.title}</h2>
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-3 flex items-center justify-center md:justify-center gap-4">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="p-1 text-gray-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 rounded"
                                            aria-label={`Reduser antall for ${item.title}`}
                                        >
                                            <MdRemoveCircleOutline size={28} />
                                        </button>
                                        <span className="text-xl font-bold w-10 text-center text-gray-900" aria-label="Antall">{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="p-1 text-gray-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 rounded"
                                            aria-label={`Øk antall for ${item.title}`}
                                        >
                                            <MdAddCircleOutline size={28} />
                                        </button>
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-2 text-center md:text-right">
                                        <div className="text-xl font-extrabold text-gray-900">${(item.discountedPrice * item.quantity).toFixed(2)}</div>
                                        {item.quantity > 1 && (
                                            <div className="text-xs text-gray-500 font-medium">${item.discountedPrice.toFixed(2)} per stk</div>
                                        )}
                                    </div>
                                    
                                    <div className="col-span-1 md:col-span-1 text-right">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
                                            aria-label={`Fjern ${item.title} fra handlevognen`}
                                        >
                                            <MdRemoveShoppingCart size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <button
                                onClick={clearCart}
                                className="text-red-600 font-bold hover:underline hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 p-2 rounded"
                            >
                                Tøm handlevogn
                            </button>
                            <div className="w-full md:w-80">
                                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                    <span className="text-2xl font-bold text-gray-900">Totalt:</span>
                                    <span className="text-3xl font-extrabold text-blue-700">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-700 text-white font-extrabold py-4 rounded-xl hover:bg-green-800 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300"
                                >
                                    Fullfør kjøp
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CheckoutPage;