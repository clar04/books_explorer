import React from 'react';
import { Link } from 'react-router-dom';
import { getBookThumbnail, formatAuthors, truncateText, generateStars } from '../../utils/helpers';

const BookCard = ({ book }) => {
    const { volumeInfo, saleInfo } = book;
    const thumbnail = getBookThumbnail(book);
    const authors = formatAuthors(volumeInfo?.authors);
    const description = truncateText(volumeInfo?.description, 120);
    const rating = volumeInfo?.averageRating || 0;
    const ratingCount = volumeInfo?.ratingsCount || 0;
    const stars = generateStars(rating);
    const price = saleInfo?.listPrice?.amount;
    const currency = saleInfo?.listPrice?.currencyCode || 'USD';

    return (
        <div className="card group overflow-hidden">
            <Link to={`/book/${book.id}`} className="block">
                {/* Book Cover */}
                <div className="relative overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={volumeInfo?.title || 'Book cover'}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = '/api/placeholder/300/400';
                        }}
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crow via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />

                    {/* Quick view button */}
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="bg-tea-rose text-crow px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                            View Details
                        </span>
                    </div>

                    {/* Price badge */}
                    {price && (
                        <div className="absolute top-4 right-4 bg-burnt-umber text-tea-rose px-2 py-1 rounded-lg text-xs font-medium">
                            ${price}
                        </div>
                    )}
                </div>

                {/* Book Information */}
                <div className="p-4">
                    {/* Title */}
                    <h3 className="font-semibold text-lg text-crow mb-2 line-clamp-2 group-hover:text-burnt-umber transition-colors duration-300">
                        {volumeInfo?.title || 'Untitled'}
                    </h3>

                    {/* Authors */}
                    <p className="text-burnt-umber text-sm mb-2 line-clamp-1">
                        by {authors}
                    </p>

                    {/* Rating */}
                    {rating > 0 && (
                        <div className="flex items-center mb-2">
                            <div className="flex items-center">
                                {/* Full stars */}
                                {Array.from({ length: stars.full }).map((_, i) => (
                                    <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}

                                {/* Half star */}
                                {stars.half > 0 && (
                                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
                                        <defs>
                                            <linearGradient id="half-star">
                                                <stop offset="50%" stopColor="currentColor" />
                                                <stop offset="50%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                        <path fill="url(#half-star)" stroke="currentColor" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                )}

                                {/* Empty stars */}
                                {Array.from({ length: stars.empty }).map((_, i) => (
                                    <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            <span className="text-xs text-gray-500 ml-2">
                                ({ratingCount})
                            </span>
                        </div>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                            {description}
                        </p>
                    )}

                    {/* Category */}
                    {volumeInfo?.categories && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {volumeInfo.categories.slice(0, 2).map((category, index) => (
                                <span
                                    key={index}
                                    className="bg-tea-rose bg-opacity-20 text-burnt-umber text-xs px-2 py-1 rounded-full"
                                >
                                    {category}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Publication Year */}
                    {volumeInfo?.publishedDate && (
                        <p className="text-xs text-gray-500">
                            Published: {new Date(volumeInfo.publishedDate).getFullYear()}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default BookCard;