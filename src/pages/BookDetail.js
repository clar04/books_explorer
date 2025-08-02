import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBookDetail } from '../hooks/useBookDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
    getBookThumbnail,
    formatAuthors,
    formatDate,
    generateStars,
    extractISBN,
    formatPrice
} from '../utils/helpers';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { book, openLibraryData, reviews, loading, error, retry } = useBookDetail(id);

    if (loading) {
        return <LoadingSpinner size="lg" text="Loading book details..." fullScreen />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                        <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Failed to load book details</h2>
                        <p className="text-red-600 mb-6">{error}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={retry} className="btn-primary">
                                Try Again
                            </button>
                            <button onClick={() => navigate(-1)} className="btn-secondary">
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Book not found</h2>
                    <Link to="/" className="btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const { volumeInfo, saleInfo } = book;
    const thumbnail = getBookThumbnail(book, 'large');
    const authors = formatAuthors(volumeInfo?.authors);
    const rating = volumeInfo?.averageRating || 0;
    const ratingCount = volumeInfo?.ratingsCount || 0;
    const stars = generateStars(rating);
    const isbn = extractISBN(book);
    const publishedDate = formatDate(volumeInfo?.publishedDate);
    const price = saleInfo?.listPrice?.amount;
    const currency = saleInfo?.listPrice?.currencyCode || 'USD';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link to="/" className="hover:text-burnt-umber transition-colors duration-300">
                        Home
                    </Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-burnt-umber font-medium">Book Details</span>
                </div>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Book Cover and Basic Info */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <div className="text-center">
                            <img
                                src={thumbnail}
                                alt={volumeInfo?.title}
                                className="w-full max-w-sm mx-auto rounded-xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/400/600';
                                }}
                            />

                            {/* Price and Buy Button */}
                            {price && (
                                <div className="mb-6">
                                    <div className="text-2xl font-bold text-burnt-umber mb-4">
                                        {formatPrice(price, currency)}
                                    </div>
                                    <button className="btn-primary w-full mb-3">
                                        Buy Now
                                    </button>
                                    <button className="btn-secondary w-full">
                                        Add to Wishlist
                                    </button>
                                </div>
                            )}

                            {/* Quick Info */}
                            <div className="bg-white rounded-xl p-6 shadow-md text-left">
                                <h3 className="font-semibold text-crow mb-4">Quick Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Pages:</span>
                                        <span className="font-medium">{volumeInfo?.pageCount || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Language:</span>
                                        <span className="font-medium">{volumeInfo?.language?.toUpperCase() || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Publisher:</span>
                                        <span className="font-medium">{volumeInfo?.publisher || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Published:</span>
                                        <span className="font-medium">{publishedDate}</span>
                                    </div>
                                    {isbn && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">ISBN:</span>
                                            <span className="font-medium">{isbn}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Title and Author */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-crow mb-4">
                            {volumeInfo?.title}
                        </h1>
                        {volumeInfo?.subtitle && (
                            <h2 className="text-xl text-gray-600 mb-4">
                                {volumeInfo.subtitle}
                            </h2>
                        )}
                        <p className="text-lg text-burnt-umber mb-6">
                            by {authors}
                        </p>

                        {/* Rating */}
                        {rating > 0 && (
                            <div className="flex items-center mb-6">
                                <div className="flex items-center mr-4">
                                    {Array.from({ length: stars.full }).map((_, i) => (
                                        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                    {stars.half > 0 && (
                                        <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24">
                                            <defs>
                                                <linearGradient id="half-star-detail">
                                                    <stop offset="50%" stopColor="currentColor" />
                                                    <stop offset="50%" stopColor="transparent" />
                                                </linearGradient>
                                            </defs>
                                            <path fill="url(#half-star-detail)" stroke="currentColor" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    )}
                                    {Array.from({ length: stars.empty }).map((_, i) => (
                                        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-lg font-semibold text-gray-700">{rating.toFixed(1)}</span>
                                <span className="text-gray-500 ml-2">({ratingCount} reviews)</span>
                            </div>
                        )}

                        {/* Categories */}
                        {volumeInfo?.categories && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {volumeInfo.categories.map((category, index) => (
                                    <span
                                        key={index}
                                        className="bg-tea-rose bg-opacity-30 text-burnt-umber px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {volumeInfo?.description && (
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-crow mb-4">Description</h3>
                            <div
                                className="text-gray-700 leading-relaxed prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                            />
                        </div>
                    )}

                    {/* Additional Info from OpenLibrary */}
                    {openLibraryData && (
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-crow mb-4">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                {openLibraryData.subjects && (
                                    <div>
                                        <h4 className="font-medium text-burnt-umber mb-2">Subjects:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {openLibraryData.subjects.slice(0, 5).map((subject, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                    {subject.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Reviews Section */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-crow mb-6">Reader Reviews</h3>
                        {reviews.length > 0 ? (
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-burnt-umber">{review.reviewer}</h4>
                                            <div className="flex items-center">
                                                {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2">{review.comment}</p>
                                        <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No reviews available yet.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
                <button
                    onClick={() => navigate(-1)}
                    className="btn-secondary inline-flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Search</span>
                </button>
            </div>
        </div>
    );
};

export default BookDetail;