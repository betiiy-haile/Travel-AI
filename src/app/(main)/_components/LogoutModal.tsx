import React from 'react';

const LogoutModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-gray-800 px-16 py-8 rounded-xl shadow-xl transform transition-all duration-300 scale-105">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Confirm Logout</h2>
                <p className="mb-6 text-gray-400 text-center">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-6 mt-6">
                    <button
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-2 rounded-lg hover:scale-105 hover:from-red-700 hover:to-red-600 transition-transform duration-200"
                        onClick={onConfirm}
                    >
                        Logout
                    </button>
                    <button
                        className="bg-gradient-to-r from-gray-300 to-gray-400 text-black px-6 py-2 rounded-lg hover:scale-105 hover:from-gray-400 hover:to-gray-500 transition-transform duration-200"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
