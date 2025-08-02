import React, { useState, useEffect } from 'react';
import { checkApiStatus } from '../../services/api';

const ApiStatus = ({ showDetails = false }) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(showDetails);

    useEffect(() => {
        if (showDetails) {
            checkStatus();
        }
    }, [showDetails]);

    const checkStatus = async () => {
        setLoading(true);
        try {
            const result = await checkApiStatus();
            setStatus(result);
        } catch (error) {
            setStatus({
                authenticated: false,
                message: 'Failed to check API status',
                error: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (!showInfo && !showDetails) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setShowInfo(true)}
                    className="bg-burnt-umber text-tea-rose p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300"
                    title="Check API Status"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className={`${showDetails ? 'relative' : 'fixed bottom-4 right-4 z-50'}`}>
            <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-crow">API Status</h3>
                    {!showDetails && (
                        <button
                            onClick={() => setShowInfo(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-burnt-umber border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-600">Checking...</span>
                    </div>
                ) : status ? (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${status.authenticated ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></div>
                            <span className={`text-sm font-medium ${status.authenticated ? 'text-green-700' : 'text-yellow-700'
                                }`}>
                                {status.authenticated ? 'Authenticated' : 'Basic Access'}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">{status.message}</p>

                        {status.authenticated ? (
                            <div className="bg-green-50 border border-green-200 rounded p-2">
                                <p className="text-xs text-green-700">
                                    ✓ Full API access enabled<br />
                                    ✓ Higher rate limits<br />
                                    ✓ Enhanced search features
                                </p>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                                <p className="text-xs text-yellow-700 mb-2">
                                    Limited to 1,000 requests/day without API key
                                </p>
                                <a
                                    href="https://console.cloud.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                                >
                                    Get API Key for Full Access →
                                </a>
                            </div>
                        )}

                        {!showDetails && (
                            <button
                                onClick={checkStatus}
                                className="w-full text-xs bg-burnt-umber text-tea-rose py-1 px-2 rounded hover:bg-opacity-90 transition-colors duration-300"
                            >
                                Refresh Status
                            </button>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={checkStatus}
                        className="w-full text-sm bg-burnt-umber text-tea-rose py-2 px-3 rounded hover:bg-opacity-90 transition-colors duration-300"
                    >
                        Check API Status
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApiStatus;