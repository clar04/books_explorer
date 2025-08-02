import React, { createContext, useContext, useReducer } from 'react';

const BooksContext = createContext();

const initialState = {
    books: [],
    loading: false,
    error: null,
    searchTerm: '',
    selectedBook: null,
    totalItems: 0,
    currentPage: 0,
};

const booksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_BOOKS':
            return {
                ...state,
                books: action.payload.books,
                totalItems: action.payload.totalItems,
                loading: false,
                error: null
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.payload };
        case 'SET_SELECTED_BOOK':
            return { ...state, selectedBook: action.payload };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export const BooksProvider = ({ children }) => {
    const [state, dispatch] = useReducer(booksReducer, initialState);

    const setLoading = (loading) => {
        dispatch({ type: 'SET_LOADING', payload: loading });
    };

    const setBooks = (books, totalItems = 0) => {
        dispatch({ type: 'SET_BOOKS', payload: { books, totalItems } });
    };

    const setError = (error) => {
        dispatch({ type: 'SET_ERROR', payload: error });
    };

    const setSearchTerm = (term) => {
        dispatch({ type: 'SET_SEARCH_TERM', payload: term });
    };

    const setSelectedBook = (book) => {
        dispatch({ type: 'SET_SELECTED_BOOK', payload: book });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const setCurrentPage = (page) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };

    const value = {
        ...state,
        setLoading,
        setBooks,
        setError,
        setSearchTerm,
        setSelectedBook,
        clearError,
        setCurrentPage,
    };

    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooksContext = () => {
    const context = useContext(BooksContext);
    if (!context) {
        throw new Error('useBooksContext must be used within a BooksProvider');
    }
    return context;
};