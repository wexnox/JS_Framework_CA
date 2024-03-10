import React from 'react'
import { Helmet } from "react-helmet";

const ContactPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact - eShop</title>
                <meta name="description" content="Get in touch with us." />
            </Helmet>
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="p-8 bg-white rounded shadow-lg text-center">
                    <h1 className="font-bold text-3xl mb-8">Contact</h1>
                    <p className="text-lg text-gray-700 mb-5">
                        Feel free to reach us at <a href="mailto:info@yoursite.com">info@yoursite.com</a>
                    </p>
                    <p className="text-lg text-gray-700 mb-5">
                        Or call us at +123456789
                    </p>
                </div>
            </div>
        </>
    );
}

export default ContactPage;