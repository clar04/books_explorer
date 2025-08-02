// Debounce function for search optimization
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Extract ISBN from book data
export const extractISBN = (book) => {
    if (!book?.volumeInfo?.industryIdentifiers) return null;

    const identifiers = book.volumeInfo.industryIdentifiers;
    const isbn13 = identifiers.find(id => id.type === 'ISBN_13');
    const isbn10 = identifiers.find(id => id.type === 'ISBN_10');

    return isbn13?.identifier || isbn10?.identifier || null;
};

// Format date to readable string
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return dateString;
    }
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

// Get book thumbnail with fallback
export const getBookThumbnail = (book, size = 'thumbnail') => {
    const imageLinks = book?.volumeInfo?.imageLinks;
    if (!imageLinks) return '/api/placeholder/300/400';

    return imageLinks[size] ||
        imageLinks.thumbnail ||
        imageLinks.smallThumbnail ||
        '/api/placeholder/300/400';
};

// Clean and format author names
export const formatAuthors = (authors) => {
    if (!authors || !Array.isArray(authors)) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' and ');
    return `${authors.slice(0, -1).join(', ')}, and ${authors[authors.length - 1]}`;
};

// Format price
export const formatPrice = (price, currency = 'USD') => {
    if (!price && price !== 0) return 'N/A';

    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(price);
    } catch {
        return `$${price}`;
    }
};

// Generate rating stars
export const generateStars = (rating, maxStars = 5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return {
        full: fullStars,
        half: hasHalfStar ? 1 : 0,
        empty: emptyStars,
    };
};

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Scroll to top smoothly
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Check if element is in viewport
export const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};