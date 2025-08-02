import axios from 'axios';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const OPENLIBRARY_API = 'https://openlibrary.org';

// Get API key from environment variables
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

// Create axios instance with default config
const googleBooksApi = axios.create({
    baseURL: GOOGLE_BOOKS_API,
    timeout: 10000, // 10 second timeout
});

// Add request interceptor to include API key if available
googleBooksApi.interceptors.request.use(
    (config) => {
        if (API_KEY) {
            config.params = {
                ...config.params,
                key: API_KEY,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
googleBooksApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // API responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    throw new Error('Invalid request. Please check your search terms.');
                case 401:
                    throw new Error('Invalid API key. Please check your authentication.');
                case 403:
                    if (data?.error?.message?.includes('quota')) {
                        throw new Error('API quota exceeded. Please try again later.');
                    }
                    throw new Error('Access forbidden. Please check your API key permissions.');
                case 429:
                    throw new Error('Too many requests. Please wait a moment and try again.');
                case 500:
                    throw new Error('Server error. Please try again later.');
                default:
                    throw new Error(`API Error: ${data?.error?.message || 'Unknown error occurred'}`);
            }
        } else if (error.request) {
            // Network error
            throw new Error('Network error. Please check your internet connection.');
        } else {
            // Other error
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
);

// Google Books API
export const searchBooks = async (query, startIndex = 0, maxResults = 12) => {
    try {
        if (!query.trim()) {
            // Return popular/trending books if no query
            query = 'bestseller fiction';
        }

        // Enhanced search parameters for better results
        const params = {
            q: query,
            startIndex,
            maxResults: Math.min(maxResults, 40), // Google Books API max is 40
            orderBy: 'relevance',
            printType: 'books',
            projection: 'lite', // Use 'full' for more detailed results
            langRestrict: 'en', // Restrict to English books (optional)
        };

        // Add additional filters if API key is available (more features with authentication)
        if (API_KEY) {
            params.filter = 'ebooks'; // Filter for ebooks only
            params.projection = 'full'; // Get full book details
        }

        const response = await googleBooksApi.get('', { params });

        return {
            books: response.data.items || [],
            totalItems: response.data.totalItems || 0,
        };
    } catch (error) {
        console.error('Error searching books:', error);
        throw error; // Re-throw the formatted error from interceptor
    }
};

export const getBookById = async (id) => {
    try {
        if (!id) {
            throw new Error('Book ID is required');
        }

        const params = {};

        // Add projection for more detailed info if API key is available
        if (API_KEY) {
            params.projection = 'full';
        }

        const response = await googleBooksApi.get(`/${id}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error; // Re-throw the formatted error from interceptor
    }
};

// Advanced search with specific fields (requires API key for better results)
export const advancedBookSearch = async (searchParams) => {
    try {
        const {
            title,
            author,
            subject,
            isbn,
            publisher,
            startIndex = 0,
            maxResults = 12,
        } = searchParams;

        // Build advanced query string
        let queryParts = [];

        if (title) queryParts.push(`intitle:${title}`);
        if (author) queryParts.push(`inauthor:${author}`);
        if (subject) queryParts.push(`subject:${subject}`);
        if (isbn) queryParts.push(`isbn:${isbn}`);
        if (publisher) queryParts.push(`inpublisher:${publisher}`);

        const query = queryParts.join('+') || 'bestseller';

        const params = {
            q: query,
            startIndex,
            maxResults: Math.min(maxResults, 40),
            orderBy: 'relevance',
            printType: 'books',
        };

        if (API_KEY) {
            params.projection = 'full';
            params.filter = 'ebooks';
        }

        const response = await googleBooksApi.get('', { params });

        return {
            books: response.data.items || [],
            totalItems: response.data.totalItems || 0,
        };
    } catch (error) {
        console.error('Error in advanced search:', error);
        throw error;
    }
};

// Get books by category/genre
export const getBooksByCategory = async (category, startIndex = 0, maxResults = 12) => {
    try {
        const query = `subject:${category}`;

        const params = {
            q: query,
            startIndex,
            maxResults: Math.min(maxResults, 40),
            orderBy: 'newest', // or 'relevance'
            printType: 'books',
        };

        if (API_KEY) {
            params.projection = 'full';
            params.filter = 'ebooks';
        }

        const response = await googleBooksApi.get('', { params });

        return {
            books: response.data.items || [],
            totalItems: response.data.totalItems || 0,
        };
    } catch (error) {
        console.error('Error fetching books by category:', error);
        throw error;
    }
};

// Check API key status and quota
export const checkApiStatus = async () => {
    try {
        if (!API_KEY) {
            return {
                authenticated: false,
                message: 'No API key configured. Using basic access with rate limits.',
            };
        }

        // Make a simple test request to check if API key is valid
        const response = await googleBooksApi.get('', {
            params: {
                q: 'test',
                maxResults: 1,
            },
        });

        return {
            authenticated: true,
            message: 'API key is valid and working.',
            quotaUser: response.headers['x-goog-quota-user'] || 'authenticated',
        };
    } catch (error) {
        return {
            authenticated: false,
            message: error.message || 'API key validation failed.',
            error: error,
        };
    }
};

// OpenLibrary API for additional book information
export const getOpenLibraryData = async (isbn) => {
    try {
        if (!isbn) return null;

        const response = await axios.get(`${OPENLIBRARY_API}/api/books`, {
            params: {
                bibkeys: `ISBN:${isbn}`,
                format: 'json',
                jscmd: 'data',
            },
        });

        const bookKey = `ISBN:${isbn}`;
        return response.data[bookKey] || null;
    } catch (error) {
        console.error('Error fetching OpenLibrary data:', error);
        return null;
    }
};

export const getBookReviews = async (isbn) => {
    try {
        if (!isbn) return [];

        // This is a mock implementation as OpenLibrary doesn't provide reviews
        // In a real app, you might integrate with Goodreads API or similar
        return [
            {
                id: 1,
                reviewer: 'BookLover123',
                rating: 4.5,
                comment: 'An amazing read! Couldn\'t put it down.',
                date: new Date().toISOString(),
            },
            {
                id: 2,
                reviewer: 'ReadingEnthusiast',
                rating: 4.0,
                comment: 'Great story with well-developed characters.',
                date: new Date().toISOString(),
            },
        ];
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
};