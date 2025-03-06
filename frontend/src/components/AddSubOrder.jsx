import React, { useEffect, useState } from 'react'

const AddSubOrder = ({ isOpen, onClose, onSubmit, userVerificationCode }) => {
    const [formData, setFormData] = useState({
        role: "CUSTOMER", // Default value dan tidak bisa diubah
        id: "",
        password: "",
        userVerificationCode: userVerificationCode // Tambahkan ini
    });



    // 🔥 Reset form setiap kali modal dibuka
    useEffect(() => {
        if (isOpen) {
            setFormData({ role: "CUSTOMER", id: "", password: "" });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.id || !formData.password) {
            alert("ID dan Password wajib diisi!");
            return;
        }
        onSubmit(formData);
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Sub Order</h2>
                <form onSubmit={handleSubmit}>

                    {/* Role (Otomatis CUSTOMER dan tidak bisa diubah) */}
                    <div className="mb-3">
                        <label className="block font-medium">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            disabled
                            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                        />
                    </div>

                    {/* ID */}
                    <div className="mb-3">
                        <label className="block font-medium">ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddSubOrder