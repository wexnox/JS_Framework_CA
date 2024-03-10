import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../settings/constants.js'
import ProductListItem from "./ProductListItem.jsx";

function isSearchMatch(item, searchValue) {
    return item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue);
}

function getSearchResults(data, searchValue) {
    return data && data.length > 0
        ? data.filter(item => isSearchMatch(item, searchValue))
        : [];
}

function SearchResultsDisplay({ searchResults }) {
    return (
        <div id={'products-container'}
             className="flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.length > 0 && searchResults.map((product) => (
                <ProductListItem key={product.id} {...product} />
            ))}
        </div>
    );
}

function Search() {
    const { value } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const searchValue = value.toLowerCase();
    const searchResults = getSearchResults(data, searchValue);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(API_BASE_URL);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [value]);

    return (
        <main className="sm:mt-10 sm:mb-20 lg:pb-72">
            <section className="mt-10 mb-20 sm:mt-12">
                <div className={'container mx-auto px-4 max-w-7xl'}>
                    <h1 className={'text-3xl font-bold mb-10'}>Search Results</h1>
                    {isLoading && (
                        <>
                            <div className={'absolute left-0 right-0 min-h-screen flex justify-center bg-white'}>
                                <div className={'loader'}></div>
                            </div>
                        </>
                    )}
                    {!isError && (
                        <h2 className={'text-lg font-normal mb-4'}>
                            {searchResults.length > 0 ? 'Results for ' : 'No matches for '}{' '}
                            <span className={'italic font-bold'}>{`'${value.trim()}'`}</span>
                        </h2>
                    )}
                    <SearchResultsDisplay searchResults={searchResults} value={value.trim()} />
                    {isError && (
                        <div className={'sm:w-fit'}>
                            <p>Something went wrong..</p>
                            <p>Please try again later</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Search;