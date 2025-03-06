import React from 'react'
import { assets } from '../assets/assets';

const successModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <img src={assets.successgif} alt="Success" className="w-40 h-40" />
                <h2 className="text-xl font-semibold mt-4">Success!</h2>
                <p className="text-gray-600 mt-2">The operation was successful.</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default successModal