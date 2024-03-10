import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { CartIcon } from "../partials/CartIcon.jsx";



const Navbar = ({ cartItems, products }) => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    function handleSearch() {

        const trimmedSearchValue = searchValue.trim();

        if (trimmedSearchValue) {
            navigate(`/search/${trimmedSearchValue.replace(/  +/g, ' ')}`);
            return true;
        }
        return false;
    }

    function handleSearchEnterPress(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <nav className="bg-gray-800 p-2 mt-0 w-full">
            <ul className="flex justify-around text-white">
                <li className="mx-3">
                    <Link to="/" className="text-xl no-underline text-grey-darkest hover:text-white">Home</Link>
                </li>
                <li className="mx-3">
                    <Link to="/products"
                          className="text-xl no-underline text-grey-darkest hover:text-white">Products</Link>
                </li>
                <li className="mx-3">
                    <Link to="/checkout"
                          className="text-xl no-underline text-grey-darkest hover:text-white">Checkout</Link>
                </li>
                <li className="mx-3">
                    <Link to="/about" className="text-xl no-underline text-grey-darkest hover:text-white">About</Link>
                </li>

                <li className="mx-3">
                    <Link to="/contact"
                          className="text-xl no-underline text-grey-darkest hover:text-white">Contact</Link>
                </li>
                {/* Search Input */}
                <div className="flex-grow px-4">
                    <div className={'mx-auto px-4 lg:p-0 '}>

                        <div className="flex gap-2 max-w-[600px]">
                            <label className={'w-full relative'}>
                                <input aria-label={'Search for venues'}
                                       className="border-gray-200 border rounded h-10 indent-4 w-full font-light placeholder:text-zinc-400 placeholder:font-normal focus:bg-transparent" // Added focus:bg-transparent
                                       type={'text'} placeholder={'Search your venues'} value={searchValue}
                                       onChange={(e) => setSearchValue(e.target.value)}
                                       onKeyUp={handleSearchEnterPress} />

                                <button aria-label={'Clear search value'} onClick={() => setSearchValue('')}
                                        className={`${searchValue.trim() ? 'absolute' : 'hidden'} right-3 top-2`}>
                                    <svg
                                        className={'pointer-events-none'}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                    >
                                        <path fill="#f87171"
                                              d="M24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12Z"
                                              opacity=".8"
                                        />
                                        <path fill="#fff"
                                              d="M8.365 8.364a.9.9 0 0 1 1.272 0L12 10.728l2.364-2.364a.9.9 0 1 1 1.271 1.272L13.274 12l2.364 2.364a.9.9 0 0 1-1.273 1.272L12 13.272l-2.363 2.364a.9.9 0 0 1-1.272-1.272L10.729 12 8.364 9.636a.9.9 0 0 1 0-1.272Z"
                                        />
                                    </svg>
                                </button>
                            </label>
                            <button onClick={handleSearch} aria-label={'Submit search'}
                                    className={'px-3 rounded hover:bg-blue-200 hover:text-white ease-out duration-200'}>Search
                            </button>
                        </div>
                    </div>
                </div>
            </ul>
            <CartIcon cartItems={cartItems} />
        </nav>
    );
}

export default Navbar;