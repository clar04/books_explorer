import { useCallback, useEffect } from 'react';
import { useBooksContext } from '../context/BooksContext';
import { searchBooks } from '../services/api';
import { debounce } from '../utils/helpers';

export const useBooks = () => {
    const {
        books,
        loading,
        error,
        searchTerm,
        totalItems,
        currentPage,
        setLoading,
        setBooks,
        setError,
        setSearchTerm,
        clearError,
        setCurrentPage,
    } = useBooksContext();

    const fetchBooks = useCallback(async (query = '', startIndex = 0) => {
        try {
            setLoading(true);
            clearError();

            const result = await searchBooks(query, startIndex);
            setBooks(result.books, result.totalItems);

            if (startIndex === 0) {
                setCurrentPage(0);
            }
        } catch (err) {
            setError(err.message);
        }
    }, [setLoading, setBooks, setError, clearError, setCurrentPage]);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            fetchBooks(query, 0);
        }, 500),
        [fetchBooks]
    );

    const handleSearch = useCallback((query) => {
        setSearchTerm(query);
        debouncedSearch(query);
    }, [setSearchTerm, debouncedSearch]);

    const loadMoreBooks = useCallback(async () => {
        if (loading) return;

        const nextStartIndex = (currentPage + 1) * 12;
        try {
            setLoading(true);
            const result = await searchBooks(searchTerm, nextStartIndex);

            // Append new books to existing ones
            setBooks([...books, ...result.books], result.totalItems);
            setCurrentPage(currentPage + 1);
        } catch (err) {
            setError(err.message);
        }
    }, [loading, currentPage, searchTerm, books, setLoading, setBooks, setError, setCurrentPage]);

    const refreshBooks = useCallback(() => {
        fetchBooks(searchTerm, 0);
    }, [fetchBooks, searchTerm]);

    // Load initial books on mount
    useEffect(() => {
        if (books.length === 0 && !loading) {
            fetchBooks('bestsellers');
        }
    }, [fetchBooks, books.length, loading]);

    return {
        books,
        loading,
        error,
        searchTerm,
        totalItems,
        currentPage,
        handleSearch,
        loadMoreBooks,
        refreshBooks,
        clearError,
    };
};