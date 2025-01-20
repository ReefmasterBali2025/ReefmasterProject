import React from 'react';

const Cites = () => {
    return (
        <div className="h-full bg-white text-black flex flex-col py-14">
            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar - Guidance */}
                <aside className="w-1/4 bg-gray-200 p-4 border-r border-gray-300">
                    <h2 className="text-lg font-bold mb-4">Guidance</h2>
                    <p className="text-sm mb-4">
                        You have 3 active CITES, tap the 'pdf' icon to see the original document.
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
                            value=""
                            onChange={(e) => e.preventDefault()} // Prevent selection change
                        >
                            <option value="" disabled>
                                Select to view CITES
                            </option>
                            <option>[1] → 99999</option>
                            <option>[2] → 77777</option>
                            <option>[3] → 5555</option>
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
