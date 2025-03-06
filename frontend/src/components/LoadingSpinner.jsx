import React from 'react'

const LoadingSpinner = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="mt-3 text-white text-lg font-semibold">Processing...</p>
            </div>
        </div>
    );
}

export default LoadingSpinner