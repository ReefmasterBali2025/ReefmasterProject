import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Mengimpor konteks toko untuk mengakses state global
import { assets } from '../assets/assets'; // Mengimpor aset seperti ikon
import { useLocation } from 'react-router-dom'; // Hook untuk mendapatkan informasi lokasi saat ini

const SearchBar = () => {
    // Mengakses nilai dan fungsi dari ShopContext
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false); // State lokal untuk mengontrol visibilitas SearchBar
    const location = useLocation(); // Mendapatkan informasi lokasi saat ini

    /**
     * useEffect ini akan berjalan setiap kali lokasi berubah.
     * Tujuannya adalah mengatur visibilitas SearchBar berdasarkan URL.
     * Jika pengguna berada di halaman 'collection', maka SearchBar akan ditampilkan.
     * Jika berada di halaman lain, SearchBar akan disembunyikan.
     */
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setShowSearch(false); // Pastikan state global showSearch disetel ke false
            setVisible(true); // Tampilkan SearchBar
        } else {
            setShowSearch(false); // Sembunyikan SearchBar di halaman selain 'collection'
            setVisible(false);
        }
    }, [location, setShowSearch]); // useEffect bergantung pada perubahan lokasi dan fungsi setShowSearch

    /**
     * Komponen akan merender elemen SearchBar hanya jika showSearch dan visible bernilai true.
     * Terdapat input teks untuk pencarian, ikon pencarian, dan ikon untuk menutup SearchBar.
     */
    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            {/* Container untuk SearchBar */}
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                {/* Input untuk pencarian */}
                <input
                    value={search} // Mengikat nilai input ke state global `search`
                    onChange={(e) => setSearch(e.target.value)} // Mengubah state `search` saat input berubah
                    className='flex-1 outline-none bg-inherit text-sm'
                    type='text'
                    placeholder='Search' // Placeholder untuk input pencarian
                />
                {/* Ikon pencarian */}
                <img className='w-4' src={assets.search_icon} />
            </div>
            {/* Ikon untuk menutup SearchBar */}
            <img
                src={assets.cross_icon}
                className='inline w-3 cursor-pointer'
                onClick={() => setShowSearch(false)} // Mengubah state showSearch menjadi false saat diklik
            />
        </div>
    ) : null; // Tidak merender apa pun jika showSearch atau visible bernilai false
};

export default SearchBar;
