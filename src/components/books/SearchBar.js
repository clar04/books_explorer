import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValue = '', placeholder = "Search for books, authors, or genres..." }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm.trim());
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            inputRef.current?.blur();
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-105' : ''
                    }`}>
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                            className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-burnt-umber' : 'text-gray-400'
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={`w-full pl-12 pr-20 py-4 text-lg rounded-xl border-2 transition-all duration-300 focus:outline-none ${isFocused
                                ? 'border-burnt-umber shadow-lg bg-white'
                                : 'border-gray-200 shadow-md bg-gray-50 hover:bg-white'
                            }`}
                    />

                    {/* Clear Button */}
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute inset-y-0 right-16 flex items-center pr-2 text-gray-400 hover:text-burnt-umber transition-colors duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}

                    {/* Search Button */}
                    <button
                        type="submit"
                        className={`absolute inset-y-0 right-0 px-6 text-white rounded-r-xl transition-all duration-300 ${isFocused || searchTerm
                                ? 'bg-burnt-umber hover:bg-opacity-90 transform scale-105'
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!searchTerm.trim()}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Search Suggestions/Quick Actions */}
                {isFocused && !searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                        <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography', 'Self-help'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm(suggestion);
                                        onSearch(suggestion);
                                    }}
                                    className="px-3 py-1 text-sm bg-tea-rose text-crow rounded-full hover:bg-opacity-80 transition-colors duration-300"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;