import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-10 mt-auto border-t-4 border-blue-700">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">eShop</h2>
                    <p className="text-gray-400">Your trusted online shop for quality products.</p>
                </div>
                <div className="flex gap-8">
                    <Link to="/" className="hover:text-blue-400 underline underline-offset-4">Home</Link>
                    <Link to="/contact" className="hover:text-blue-400 underline underline-offset-4">Contact</Link>
                </div>
                <div className="text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} eShop. Built with accessibility in mind.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;