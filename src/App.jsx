import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx'
import HomePage from './components/pages/HomePage.jsx'
import AboutPage from './components/pages/AboutPage.jsx'
import NotFoundPage from './components/pages/NotFoundPage.jsx'
import ContactPage from "./components/pages/ContactPage.jsx";
import CheckoutPage from "./components/checkout/CheckoutPage.jsx";
import ProductDetail from "./components/product/ProductDetails.jsx";
import Products from "./components/product/ProductsPage.jsx";
import Search from "./components/partials/Search.jsx";
import { CartProvider } from './context/CartContext.jsx';
import CheckoutSuccessPage from "./components/checkout/CheckoutSuccessPage.jsx";

function App() {
    return (

        <CartProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="/search/:value" element={<Search />} />
                    </Routes>
                </Layout>
            </Router>
        </CartProvider>
    );
}

export default App;