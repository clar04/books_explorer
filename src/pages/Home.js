import React, { useEffect } from 'react';
import SearchBar from '../components/books/SearchBar';
import BookList from '../components/books/BookList';
import ApiStatus from '../components/common/ApiStatus';
import { useBooks } from '../hooks/useBooks';

const Home = () => {
    const {
        books,
        loading,
        error,
        searchTerm,
        totalItems,
        currentPage,
        handleSearch,
        loadMoreBooks,
        clearError,
    } = useBooks();

    const hasMore = books.length < totalItems && totalItems > 0;

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                clearError();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <section className="text-center mb-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-crow mb-6 text-shadow">
                        Discover Your Next
                        <span className="text-burnt-umber"> Great Read</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Explore millions of books from the world's largest digital library.
                        Find bestsellers, hidden gems, and everything in between.
                    </p>

                    {/* Search Bar */}
                    <SearchBar
                        onSearch={handleSearch}
                        initialValue={searchTerm}
                        placeholder="Search for books, authors, or genres..."
                    />
                </div>
            </section>

            {/* Featured Categories */}
            {!searchTerm && books.length === 0 && !loading && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-crow mb-6">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { name: 'Fiction', emoji: '📚', color: 'bg-blue-100 text-blue-800' },
                            { name: 'Mystery', emoji: '🔍', color: 'bg-purple-100 text-purple-800' },
                            { name: 'Romance', emoji: '💕', color: 'bg-pink-100 text-pink-800' },
                            { name: 'Sci-Fi', emoji: '🚀', color: 'bg-green-100 text-green-800' },
                            { name: 'Biography', emoji: '👤', color: 'bg-yellow-100 text-yellow-800' },
                            { name: 'Self-help', emoji: '💪', color: 'bg-orange-100 text-orange-800' },
                        ].map((category) => (
                            <button
                                key={category.name}
                                onClick={() => handleSearch(category.name)}
                                className={`${category.color} p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg`}
                            >
                                <div className="text-2xl mb-2">{category.emoji}</div>
                                <div className="font-medium text-sm">{category.name}</div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Search Results or Featured Books */}
            <section>
                {searchTerm && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-crow">
                            Search Results for "{searchTerm}"
                        </h2>
                        {totalItems > 0 && (
                            <p className="text-gray-600 mt-2">
                                Found {totalItems.toLocaleString()} books
                            </p>
                        )}
                    </div>
                )}

                {!searchTerm && books.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-crow">Featured Books</h2>
                        <p className="text-gray-600 mt-2">Discover popular and trending titles</p>
                    </div>
                )}

                <BookList
                    books={books}
                    loading={loading}
                    error={error}
                    onLoadMore={hasMore ? loadMoreBooks : null}
                    hasMore={hasMore}
                    totalItems={totalItems}
                    currentPage={currentPage}
                />
            </section>

            {/* Call to Action */}
            {!loading && books.length > 0 && (
                <section className="text-center mt-16 py-12 bg-gradient-to-r from-tea-rose to-burnt-umber rounded-2xl">
                    <div className="max-w-2xl mx-auto px-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-white text-opacity-90 mb-6">
                            Try different search terms or explore our vast collection of books across all genres.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="bg-white text-burnt-umber px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
                        >
                            Search Again
                        </button>
                    </div>
                </section>
            )}

            {/* API Status Component */}
            <ApiStatus />
        </div>
    );
};

export default Home;