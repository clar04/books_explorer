import React from 'react';
import BookCard from './BookCard';
import { BookListSkeleton } from '../common/LoadingSpinner';

const BookList = ({
    books = [],
    loading = false,
    error = null,
    onLoadMore = null,
    hasMore = false,
    totalItems = 0,
    currentPage = 0
}) => {
    if (loading && books.length === 0) {
        return <BookListSkeleton count={12} />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!loading && books.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                    <p className="text-gray-500 mb-4">
                        Try adjusting your search terms or browse our featured collections.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-secondary"
                        >
                            Refresh
                        </button>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="btn-primary"
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Results info */}
            {totalItems > 0 && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <p>
                        Showing {books.length} of {totalItems.toLocaleString()} results
                    </p>
                    {currentPage > 0 && (
                        <p>
                            Page {currentPage + 1}
                        </p>
                    )}
                </div>
            )}

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                    <div key={`${book.id}-${index}`} className="fade-in">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>

            {/* Loading more books */}
            {loading && books.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <BookListSkeleton count={4} />
                </div>
            )}

            {/* Load More Button */}
            {hasMore && onLoadMore && !loading && (
                <div className="text-center pt-8">
                    <button
                        onClick={onLoadMore}
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <span>Load More Books</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            )}

            {/* End of results message */}
            {!hasMore && books.length > 0 && totalItems > books.length && (
                <div className="text-center pt-8">
                    <p className="text-gray-500">You've reached the end of the results.</p>
                </div>
            )}
        </div>
    );
};

export default BookList;