import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl } from "../App";

const Cites = () => {

    const [citesList, setCitesList] = useState([]);
    const [selectedCites, setSelectedCites] = useState(""); // Untuk menyimpan pilihan dropdown

    useEffect(() => {
        // ✅ Ambil data user dari localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            console.error("❌ Tidak ada user yang login.");
            return;
        }

        // ✅ Ambil CITES dari user yang login
        const fetchCites = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/user/list-user`);
                if (response.data.success) {
                    const allUsers = response.data.users;
                    const currentUser = allUsers.find(user => user.ID === storedUser.ID);

                    if (!currentUser) {
                        console.error("❌ User tidak ditemukan di database.");
                        return;
                    }

                    // ✅ Ambil semua nilai dari NO_CITES_1 - NO_CITES_10
                    const citesNumbers = [];
                    for (let i = 1; i <= 10; i++) {
                        const citesKey = `NO_CITES_${i}`;
                        if (currentUser[citesKey]) {
                            citesNumbers.push(currentUser[citesKey]);
                        }
                    }

                    setCitesList(citesNumbers);
                }
            } catch (error) {
                console.error("❌ Error fetching CITES data:", error);
            }
        };

        fetchCites();
    }, []);


    return (
        <div className="h-full bg-white text-black flex flex-col pt-14 ">
            {/* Main Content */}
            <div className="flex flex-1 flex-col md:flex-row">
                {/* Sidebar - Guidance */}
                <aside className="w-full md:w-1/4 bg-gray-200 p-9 md:p-3 lg:p-5 border-r border-gray-300 ">
                    <h2 className="text-lg font-bold mb-4">Guidance</h2>
                    <p className="text-sm mb-4">
                        You have {citesList.length} active CITES, tap the 'pdf' icon to see the original document.
                    </p>
                    <p className="text-sm">
                        Please kindly maximize our Hard Coral Cites, so we can always deliver our best price.
                    </p>
                    {/* View-Only Dropdown */}
                    <div className="mt-4">
                        <label htmlFor="citesDropdown" className="block text-sm font-medium mb-2">
                            Active CITES:
                        </label>
                        <select
                            id="citesDropdown"
                            className="w-full p-2 border border-gray-300 rounded bg-white cursor-pointer"
                            value={selectedCites}
                            onChange={(e) => setSelectedCites(e.target.value)}
                        >
                            <option value="" disabled>
                                Select to view CITES
                            </option>
                            {citesList.map((cites, index) => (
                                <option key={index} value={cites}>
                                    [{index + 1}] → {cites}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Cites Culture & Wild */}
                <main className="flex-1 flex flex-col lg:flex-row">
                    {/* CITES Culture */}
                    <section className="flex-1 p-4">
                        <h2 className="text-lg font-bold mb-4">CITES CULTURE</h2>
                        <div className="overflow-auto border border-gray-300">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border-b">Cites</th>
                                        <th className="p-2 border-b">Remaining</th>
                                        <th className="p-2 border-b">Qty</th>
                                        <th className="p-2 border-b">Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example rows */}
                                    <tr>
                                        <td className="p-2 border-b">Acanthastrea spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* CITES Wild */}
                    <section className="flex-1 p-4">
                        <h2 className="text-lg font-bold mb-4">CITES WILD</h2>
                        <div className="overflow-auto border border-gray-300">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border-b">Cites</th>
                                        <th className="p-2 border-b">Remaining</th>
                                        <th className="p-2 border-b">Qty</th>
                                        <th className="p-2 border-b">Order</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Example rows */}
                                    <tr>
                                        <td className="p-2 border-b">Acanthastrea spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr><tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 border-b">Acropora spp.</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">100</td>
                                        <td className="p-2 border-b">0</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Cites;
