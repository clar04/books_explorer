import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-tea-rose to-burnt-umber flex items-center justify-center px-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-white opacity-20 mb-4">404</h1>
                    <div className="relative">
                        <svg
                            className="w-32 h-32 mx-auto text-white opacity-60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                    </div>
                </div>

                <div className="max-w-md mx-auto mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-white text-opacity-80 text-lg mb-8">
                        The page you're looking for seems to have wandered off into another chapter.
                        Let's get you back to discovering great books!
                    </p>

                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="block bg-white text-burnt-umber px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Back to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="block w-full bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-burnt-umber transition-all duration-300"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                <div className="text-white text-opacity-60 text-sm">
                    <p>Error 404 - The requested page could not be found</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;