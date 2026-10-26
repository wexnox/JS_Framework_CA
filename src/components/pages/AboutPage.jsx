import React from 'react';
import {Helmet} from "react-helmet-async";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Us - eShop</title>
                <meta name="description" content="Learn more about eShop, your destination for quality products online." />
            </Helmet>
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <h1 className="font-extrabold text-4xl mb-8 text-center text-gray-900">About us</h1>
                    <div className="prose prose-lg text-gray-700 leading-relaxed">
                        <p className="mb-6">
                            Welcome to eShop, your destination for quality products online. We are passionate about delivering the best shopping experience to our customers, with a focus on usability and quality.
                        </p>
                        <p className="mb-6">
                            Our goal is to offer a wide selection of products that meet your needs, whether you are looking for the latest in electronics, fashion or home goods.
                        </p>
                        <p>
                            This application is built with a focus on universal design and accessibility, so that everyone can shop safely and easily with us.
                        </p>
                    </div>
                </article>
            </div>
        </>
    );
}

export default AboutPage;