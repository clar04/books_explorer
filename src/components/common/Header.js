import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-gradient-to-r from-crow to-burnt-umber shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-tea-rose hover:text-white transition-colors duration-300"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 5h14v2H5V5zm0 4h4v6H5V9zm6 0h8v2h-8V9zm0 4h8v2h-8v-2z" />
                        </svg>
                        <span className="text-xl font-bold">BookExplorer</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors duration-300 ${isActive('/')
                                ? 'text-tea-rose border-b-2 border-tea-rose pb-1'
                                : 'text-gray-300 hover:text-tea-rose'
                                }`}
                        >
                            Home
                        </Link>
                        <Link to="/" className="text-sm font-medium text-gray-300 hover:text-tea-rose transition-colors duration-300">
                            Categories
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-tea-rose transition-colors duration-300">
                            About
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-tea-rose hover:text-white p-2 rounded-md transition-colors duration-300"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 pb-4' : 'max-h-0'
                    }`}>
                    <nav className="space-y-4">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block text-sm font-medium transition-colors duration-300 ${isActive('/') ? 'text-tea-rose' : 'text-gray-300 hover:text-tea-rose'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm font-medium text-gray-300 hover:text-tea-rose transition-colors duration-300 w-full text-left"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-sm font-medium text-gray-300 hover:text-tea-rose transition-colors duration-300 w-full text-left"
                        >
                            About
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;