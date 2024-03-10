import React, {createContext, useContext, useEffect, useState} from 'react';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const localCart = localStorage.getItem('cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex > -1) {
                const newCart = [...prevCart];
                newCart[existingProductIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
            ),
        );
    };

    const decreaseQuantity = (productId) => {
        setCart(currentCart =>
            currentCart.map(item =>
                item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item,
            ),
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
