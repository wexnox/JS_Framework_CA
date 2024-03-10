import React from 'react';
import {Helmet} from "react-helmet";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Your Site's Name</title>
                <meta name="description" content="Detailed description about us." />
            </Helmet>
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="p-8 bg-white rounded shadow-lg text-center">
                    <h1 className="font-bold text-3xl mb-8">About Us</h1>
                    <p className="text-lg text-gray-700 mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                        nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
                    </p>
                    <p className="text-lg text-gray-700 mb-5">
                        Morbi a bibendum metus. Donec scelerisque sollicitudin enim, eu
                        venenatis dolor pharetra pretium.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutPage;