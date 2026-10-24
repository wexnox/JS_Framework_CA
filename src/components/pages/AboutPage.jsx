import React from 'react';
import {Helmet} from "react-helmet-async";

const AboutPage = () => {
    return (
        <>
            <Helmet>
                <title>About Us - Your Site's Name</title>
                <meta name="description" content="Detailed description about us." />
            </Helmet>
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <h1 className="font-extrabold text-4xl mb-8 text-center text-gray-900">Om oss</h1>
                    <div className="prose prose-lg text-gray-700 leading-relaxed">
                        <p className="mb-6">
                            Velkommen til eShop, din destinasjon for kvalitetsprodukter på nett. Vi brenner for å levere den beste handelsopplevelsen til våre kunder, med fokus på brukervennlighet og kvalitet.
                        </p>
                        <p className="mb-6">
                            Vårt mål er å tilby et variert utvalg av produkter som møter dine behov, enten du leter etter det nyeste innen elektronikk, mote eller hjemmeartikler.
                        </p>
                        <p>
                            Denne applikasjonen er utviklet med fokus på universell utforming (UU) og tilgjengelighet, slik at alle kan handle trygt og enkelt hos oss.
                        </p>
                    </div>
                </article>
            </div>
        </>
    );
}

export default AboutPage;