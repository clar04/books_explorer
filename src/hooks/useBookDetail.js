import { useState, useEffect, useCallback } from 'react';
import { getBookById, getOpenLibraryData, getBookReviews } from '../services/api';
import { extractISBN } from '../utils/helpers';

export const useBookDetail = (bookId) => {
    const [book, setBook] = useState(null);
    const [openLibraryData, setOpenLibraryData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBookDetail = useCallback(async (id) => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);

            // Fetch main book data from Google Books
            const bookData = await getBookById(id);
            setBook(bookData);

            // Extract ISBN for additional data
            const isbn = extractISBN(bookData);

            if (isbn) {
                // Fetch additional data from OpenLibrary
                const [olData, reviewsData] = await Promise.allSettled([
                    getOpenLibraryData(isbn),
                    getBookReviews(isbn)
                ]);

                if (olData.status === 'fulfilled' && olData.value) {
                    setOpenLibraryData(olData.value);
                }

                if (reviewsData.status === 'fulfilled') {
                    setReviews(reviewsData.value);
                }
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const retry = useCallback(() => {
        if (bookId) {
            fetchBookDetail(bookId);
        }
    }, [bookId, fetchBookDetail]);

    useEffect(() => {
        fetchBookDetail(bookId);
    }, [bookId, fetchBookDetail]);

    return {
        book,
        openLibraryData,
        reviews,
        loading,
        error,
        retry,
    };
};