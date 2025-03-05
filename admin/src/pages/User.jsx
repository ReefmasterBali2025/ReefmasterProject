import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx"; // Pastikan URL backend sudah diatur dengan benar
import { toast } from "react-toastify";

const User = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // 🔹 Fetch data user dari backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/list-user`, { headers: { token } });
            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("❌ Error fetching users:", error);
            toast.error("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🔍 Filter berdasarkan `USER_NO`, `ROLE`, atau `KEY`
    const filteredUsers = users.filter(user =>
        Object.values(user)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User List</h2>

            {/* 🔍 Input Pencarian */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by USER NO, ROLE, or KEY..."
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
                />
            </div>

            {/* 🔄 Loading Indicator */}
            {loading && <p className="text-center text-gray-600">Loading users...</p>}

            {/* ❌ Jika Tidak Ada Data */}
            {!loading && filteredUsers.length === 0 && (
                <p className="text-center text-gray-600">No users found.</p>
            )}

            {/* 🔥 Tabel User */}
            {!loading && filteredUsers.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-2 px-4">USER NO</th>
                                <th className="py-2 px-4">KEY</th>
                                <th className="py-2 px-4">ROLE</th>
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">LANGUAGE</th>
                                <th className="py-2 px-4">ORDER TYPE</th>
                                <th className="py-2 px-4">TOTAL ORDER</th>
                                <th className="py-2 px-4">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr
                                    key={index}
                                    className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="py-2 px-4">{user.USER_NO}</td>
                                    <td className="py-2 px-4">{user.KEY}</td>
                                    <td className="py-2 px-4">{user.ROLE}</td>
                                    <td className="py-2 px-4">{user.ID}</td>
                                    <td className="py-2 px-4">{user.LANGUAGE}</td>
                                    <td className="py-2 px-4">{user.ORDER_TYPE}</td>
                                    <td className="py-2 px-4">{user.TOTAL_ORDER}</td>
                                    <td className="py-2 px-4">${user.AMOUNT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default User;
