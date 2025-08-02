import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
    };

    const spinnerContent = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-tea-rose border-t-transparent`}></div>
                <div className={`${sizeClasses[size]} absolute top-0 animate-ping rounded-full border border-tea-rose opacity-75`}></div>
            </div>
            {text && (
                <p className={`${textSizes[size]} text-burnt-umber font-medium animate-pulse`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
                {spinnerContent}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            {spinnerContent}
        </div>
    );
};

// Card loading skeleton
export const CardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="space-y-3">
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                <div className="bg-gray-200 h-3 rounded w-full"></div>
                <div className="bg-gray-200 h-3 rounded w-2/3"></div>
            </div>
        </div>
    );
};

// Book list loading skeleton
export const BookListSkeleton = ({ count = 12 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
};

export default LoadingSpinner;