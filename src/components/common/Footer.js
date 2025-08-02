import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-crow text-tea-rose mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold mb-4">BookExplorer</h3>
                            <p className="text-gray-300 mb-4 max-w-md">
                                Discover your next favorite book with our comprehensive collection.
                                Search, explore, and dive into the world of literature.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-tea-rose transition-colors duration-300"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-tea-rose transition-colors duration-300"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-7.29 2.033 13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-tea-rose transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Browse Books
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        New Releases
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Best Sellers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Categories
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-300 hover:text-tea-rose transition-colors duration-300">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-burnt-umber mt-8 pt-8 text-center">
                        <p className="text-gray-300">
                            © 2025 BookExplorer. All rights reserved. Built with React & Tailwind CSS.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;