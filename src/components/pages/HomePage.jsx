import React from 'react';
import { Helmet } from "react-helmet";
import Slider from "../partials/Slider.jsx";

function HomePage() {
    return (
        <>
            <Helmet>
                <title>Home - eShop</title>
                <meta name="description" content="Welcome to our website!" />
            </Helmet>
            <Slider />
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="p-8 bg-white rounded shadow-lg">
                    <h1 className="text-xl font-bold mb-4">Welcome to the HomePage!</h1>
                    <p className="text-gray-700">This is your starting point, you can further develop your page according to your brief.md content.</p>
                </div>
            </div>
        </>
    )
}

export default HomePage;