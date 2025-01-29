import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [settings, setSettings] = useState({
    priceMargin: 50,
    freightMargin: 30,
    importDuties: 1000,
  });

  const [subOrders, setSubOrders] = useState([
    { id: 'demo1', role: 'IMPORTER', password: 'demo', note: '' },
    { id: 'custa', role: 'CUSTOMER', password: '123', note: '' },
  ]);

  const [toggles, setToggles] = useState({
    subOrderMode: true,
    showCTNS: false,
    showFreightCost: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteSubOrder = (id) => {
    setSubOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleAddSubOrder = () => {
    setSubOrders((prev) => [
      ...prev,
      { id: `new${prev.length + 1}`, role: '', password: '', note: '' },
    ]);
  };

    const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State untuk pop-up logout
    const navigate = useNavigate();

  const handleLogout = () => {
    // Tambahkan logika logout seperti menghapus token, dsb.
    alert('You have been logged out.');
    setShowLogoutPopup(false);
    navigate('/login'); // Arahkan ke halaman login
 };

  return (
    <nav className="flex py-14">
      {/* Left Section */}
      <div className="bg-blue-900 text-white w-1/3 p-4 flex flex-col items-center min-h-full">
        <div className="text-center">
          <img className='w-full p-4 cursor-pointer' src={assets.p_img11} />
          <h2 className="text-xl font-bold">demo1</h2>
          <p>IMPORTER</p>
        </div>
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-4">Transhipment Mode</h3>
          <div className="flex items-center justify-between mb-4">
            <p>Sub Order Mode</p>
            <input
              type="checkbox"
              checked={toggles.subOrderMode}
              onChange={() => handleToggle('subOrderMode')}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <p>Show CTNS to Sub Order</p>
            <input
              type="checkbox"
              checked={toggles.showCTNS}
              onChange={() => handleToggle('showCTNS')}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <p>Show Freight Cost to Sub Order</p>
            <input
              type="checkbox"
              checked={toggles.showFreightCost}
              onChange={() => handleToggle('showFreightCost')}
            />
          </div>
        </div>
        <button
            onClick={() => setShowLogoutPopup(true)} 
            className="mt-8 bg-purple-600 text-white px-4 py-2 rounded">Log Out</button>
      </div>

      {/* Right Section */}
      <div className="bg-white text-black w-2/3 p-6">
        {/* Settings */}
        <div className="border rounded mb-6 p-4">
          <h3 className="text-lg font-semibold mb-4">SETTING</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label>Price Margin (%)</label>
              <input
                type="number"
                value={settings.priceMargin}
                onChange={(e) => handleSettingChange('priceMargin', e.target.value)}
                className="w-24 border rounded p-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Freight Margin (%)</label>
              <input
                type="number"
                value={settings.freightMargin}
                onChange={(e) => handleSettingChange('freightMargin', e.target.value)}
                className="w-24 border rounded p-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Import Duties</label>
              <input
                type="number"
                value={settings.importDuties}
                onChange={(e) => handleSettingChange('importDuties', e.target.value)}
                className="w-24 border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Sub Order */}
        <div className="border rounded p-4">
          <h3 className="text-lg font-semibold mb-4">SUB ORDER</h3>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">ID</th>
                <th className="border border-gray-200 p-2">ROLE</th>
                <th className="border border-gray-200 p-2">PASSWORD</th>
                <th className="border border-gray-200 p-2">NOTE</th>
                <th className="border border-gray-200 p-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {subOrders.map((order, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 p-2">{order.id}</td>
                  <td className="border border-gray-200 p-2">{order.role}</td>
                  <td className="border border-gray-200 p-2">{order.password}</td>
                  <td className="border border-gray-200 p-2">{order.note}</td>
                  <td className="border border-gray-200 p-2">
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteSubOrder(order.id)}
                    >
                      &#x1F5D1; Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleAddSubOrder}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Sub Order
          </button>
        </div>
      </div>

      {/* Pop-up Logout */}
      {showLogoutPopup && (
                <div
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20'
                >
                    <div className='bg-white p-5 rounded-lg text-center'>
                        <h2 className='mb-3 text-lg font-semibold'>Logout Account</h2>
                        <p className='text-sm text-gray-600 mb-4'>
                            Are you sure you want to logout? Once you logout, you need to login again. Are you OK?
                        </p>
                        <div className='flex justify-around'>
                            <button
                                onClick={() => setShowLogoutPopup(false)}
                                className='px-4 py-2 bg-blue-600 text-white rounded-md'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 bg-red-500 text-white rounded-md'
                            >
                                Yes, Logout!
                            </button>
                        </div>
                    </div>
                </div>
            )}
    </nav>
  );
};

export default Profile;