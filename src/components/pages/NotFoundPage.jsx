import React from 'react';
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>404 - Not Found - eShop</title>
                <meta name="description" content="The page you were looking for doesn't exist." />
            </Helmet>
            <div className="flex items-center justify-center h-screen text-center bg-gray-200">
                <div>
                    <h1 className="font-bold text-5xl mb-8">404</h1>
                    <p className="font-medium text-3xl">Page Not Found</p>
                    <p className="text-lg text-gray-700">The page you were looking for doesn't exist.</p>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;