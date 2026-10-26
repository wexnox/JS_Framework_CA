import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        subject: '',
        email: '',
        body: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (formData.fullName.length < 3) {
            newErrors.fullName = 'Full name must be at least 3 characters.';
        }
        if (formData.subject.length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (formData.body.length < 3) {
            newErrors.body = 'Body must be at least 3 characters.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form Data:', formData);
            setIsSubmitted(true);
            setFormData({ fullName: '', subject: '', email: '', body: '' });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - eShop</title>
                <meta name="description" content="Have questions? Contact us using the form below." />
            </Helmet>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>

                    {isSubmitted ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline"> Your message has been sent. Check the console for data.</span>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-4 block text-sm font-semibold hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-800 font-bold mb-2">Full name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-600 focus:ring-red-200' : 'border-gray-400 focus:ring-blue-700'}`}
                                    placeholder="Your name"
                                    required
                                    aria-invalid={!!errors.fullName}
                                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                                />
                                {errors.fullName && <p id="fullName-error" className="text-red-700 text-sm font-semibold mt-1">{errors.fullName}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-gray-800 font-bold mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.subject ? 'border-red-600 focus:ring-red-200' : 'border-gray-400 focus:ring-blue-700'}`}
                                    placeholder="Subject"
                                    required
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? "subject-error" : undefined}
                                />
                                {errors.subject && <p id="subject-error" className="text-red-700 text-sm font-semibold mt-1">{errors.subject}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-800 font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-600 focus:ring-red-200' : 'border-gray-400 focus:ring-blue-700'}`}
                                    placeholder="your.email@example.com"
                                    required
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />
                                {errors.email && <p id="email-error" className="text-red-700 text-sm font-semibold mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="body" className="block text-gray-800 font-bold mb-2">Message</label>
                                <textarea
                                    id="body"
                                    name="body"
                                    rows="5"
                                    value={formData.body}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.body ? 'border-red-600 focus:ring-red-200' : 'border-gray-400 focus:ring-blue-700'}`}
                                    placeholder="How can we help you?"
                                    required
                                    aria-invalid={!!errors.body}
                                    aria-describedby={errors.body ? "body-error" : undefined}
                                ></textarea>
                                {errors.body && <p id="body-error" className="text-red-700 text-sm font-semibold mt-1">{errors.body}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                            >
                                Send message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default ContactPage;