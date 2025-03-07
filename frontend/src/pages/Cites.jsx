import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl } from "../App";
import LoadingSpinner from '../components/LoadingSpinner';

const Cites = () => {

    const [citesList, setCitesList] = useState([]);
    const [selectedCites, setSelectedCites] = useState("");
    const [citesData, setCitesData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            console.error("❌ Tidak ada user yang login.");
            return;
        }

        const fetchUserCites = async () => {
            try {
                const userResponse = await axios.get(`${backendUrl}/api/user/list-user`);
                if (userResponse.data.success) {
                    const allUsers = userResponse.data.users;
                    const currentUser = allUsers.find((user) => user.ID === storedUser.ID);

                    if (!currentUser) {
                        console.error("❌ User tidak ditemukan di database.");
                        return;
                    }

                    // ✅ Ambil NO_CITES_1 - NO_CITES_10 yang dimiliki user
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
                console.error("❌ Error fetching CITES numbers:", error);
            }
        };

        fetchUserCites();
    }, []);

    useEffect(() => {
        if (!selectedCites) {
            setCitesData(null);
            return;
        }

        const fetchCitesDetail = async () => {
            setLoading(true);

            try {
                if (selectedCites === "ALL") {
                    const response = await axios.post(`${backendUrl}/api/citesAllDetails`, { citesList });
                    if (response.data.success) {
                        setTimeout(() => {
                            setCitesData(response.data.data); // ✅ Pastikan structure benar
                            setLoading(false);
                        }, 500);
                    }
                } else {
                    const response = await axios.get(`${backendUrl}/api/citesNumberDetail/${selectedCites}`);
                    if (response.data.success) {
                        setTimeout(() => {
                            setCitesData({
                                [response.data.cites_category]: response.data.data.map((item) => ({
                                    scientific_name: item.scientific_name,
                                    quantity: item.quantity,
                                    order: 0,
                                })),
                            });
                            setLoading(false);
                        }, 500);
                    }
                }
            } catch (error) {
                console.error("❌ Error fetching CITES detail:", error);
                setLoading(false);
            }
        };

        fetchCitesDetail();
    }, [selectedCites]);

    // console.log(selectedCites);
    console.log(citesList);



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
                            <option value="ALL">All Cites</option> {/* 🔥 Tambahkan opsi "All Cites" */}
                            {citesList.map((cites, index) => (
                                <option key={index} value={cites}>
                                    [{index + 1}] → {cites}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                <main className="flex-1 p-4">
                    {loading && <LoadingSpinner isLoading={loading} />} {/* ✅ Tampilkan loading spinner */}
                    {!loading && selectedCites && citesData ? (
                        Object.keys(citesData).map((category, index) => ( // ✅ Render tabel per kategori
                            <div key={index} className="mb-6">
                                <h2 className="text-lg font-bold mb-4">CITES {category}</h2>
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
                                            {citesData[category].map((item, idx) => ( // ✅ Data dari kategori
                                                <tr key={idx}>
                                                    <td className="p-2 border-b">{item.scientific_name}</td>
                                                    <td className="p-2 border-b">{item.quantity - item.order || 0}</td>
                                                    <td className="p-2 border-b">{item.quantity}</td>
                                                    <td className="p-2 border-b">{item.order || 0}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))
                    ) : !loading ? (
                        <p className="text-center text-lg font-semibold text-gray-500">No CITES Selected</p>
                    ) : null}
                </main>
            </div>
        </div>
    );
};

export default Cites;
