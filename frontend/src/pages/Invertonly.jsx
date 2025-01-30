// Mengimpor React dan hooks yang diperlukan seperti useContext, useEffect, dan useState
// Mengimpor konteks dari ShopContext untuk mendapatkan data produk dan pencarian
// Mengimpor aset dan komponen Title serta ProductItem
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

// Komponen utama untuk menampilkan koleksi produk
const Invert = () => {
    // Mengambil data dari ShopContext menggunakan useContext
    const { products, search, showSearch } = useContext(ShopContext);

    // Mendeklarasikan state untuk fitur filter, sort, kategori, dan subkategori
    const [showFilter, setShowFilter] = useState(false); // Untuk menampilkan/menyembunyikan filter
    const [filterProducts, setFilterProducts] = useState([]); // Menyimpan daftar produk yang telah difilter
    const [category, setCategory] = useState([]); // Menyimpan kategori yang dipilih
    const [subCategory, setSubCategory] = useState([]); // Menyimpan subkategori yang dipilih
    const [sortType, setSortType] = useState('relevant'); // Tipe pengurutan produk

    // Fungsi untuk menambah/menghapus kategori yang dipilih
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setCategory((prev) => [...prev, e.target.value]);
        }
    };

    // Fungsi untuk menambah/menghapus subkategori yang dipilih
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        } else {
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    };

    // Fungsi untuk memperbarui daftar produk berdasarkan filter dan pengurutan
    const updateFilteredAndSortedProducts = () => {
        let productsCopy = products.slice(); // Salin array produk

        // Filter berdasarkan pencarian
        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter berdasarkan kategori
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }

        // Filter berdasarkan subkategori
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }

        // Mengurutkan produk berdasarkan tipe yang dipilih
        switch (sortType) {
            case 'low-high': // Harga rendah ke tinggi
                productsCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low': // Harga tinggi ke rendah
                productsCopy.sort((a, b) => b.price - a.price);
                break;
            default: // Tidak ada pengurutan khusus
                break;
        }

        setFilterProducts(productsCopy); // Memperbarui daftar produk yang ditampilkan
    };

    // Memanggil fungsi filter dan sort setiap kali state terkait berubah
    useEffect(() => {
        updateFilteredAndSortedProducts();
    }, [category, subCategory, sortType, showSearch, search]);



    return (
        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-10 pt-10 border-t my-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            {/* Bagian kiri untuk filter */}
            <div className='min-w-32 md:w-[0.1px] w-full'>
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className='my-2 text-xl flex items-center gap-2'
                >
                    FILTERS
                    <img
                        className={`h-3 md:hidden ${showFilter ? 'rotate-90' : ''} cursor-pointer`}
                        src={assets.dropdown_icon}
                    />
                </p>

                {/* /* Filter kategori */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} md:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'Culture'}
                                onChange={toggleCategory}
                            />
                            Culture
                        </p>
                        <p className='flex gap-2'>
                            <input
                                className='w-3'
                                type='checkbox'
                                value={'Wild'}
                                onChange={toggleCategory}
                            />
                            Wild
                        </p>
                    </div>
                </div> 

                {/* Filter subkategori */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} md:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {/* Daftar subkategori */}
                        {['Invertebrate'].map((type) => (
                            <p key={type} className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={type}
                                    onChange={toggleSubCategory}
                                />
                                {type}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bagian kanan untuk produk */}
            <div className='flex-1 md:w-3/4 w-full '>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* Dropdown untuk sorting produk */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className='border-2 border-gray-300 text-sm px-2'
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Tampilkan pesan "No Items" jika tidak ada produk */}
                {filterProducts.length === 0 ? (
                    <div className='flex items-center justify-center h-full min-h-[300px] text-center text-gray-500'>
                        <p>No Items Found</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
                        {filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                name={item.name}
                                id={item._id}
                                price={item.price}
                                image={item.image}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

};

export default Invert;
