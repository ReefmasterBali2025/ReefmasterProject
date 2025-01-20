// Mengimpor React dan hooks yang diperlukan seperti useContext, useEffect, dan useState
// Mengimpor konteks dari ShopContext untuk mendapatkan data produk dan pencarian
// Mengimpor aset dan komponen Title serta ProductItem
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import '../index.css'

// Komponen utama untuk menampilkan koleksi produk
const Collection = () => {
    // Mengambil data dari ShopContext menggunakan useContext
    const { products, search, showSearch } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
    const ITEMS_PER_PAGE = 30; // Jumlah item per halaman
    const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE); // Hitung total halaman

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    // Fungsi untuk memperbarui produk yang difilter
    const updateFilteredAndSortedProducts = () => {
        let productsCopy = products.slice();

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

        // Filter berdasarkan sub-kategori
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }

        // Sortir produk
        switch (sortType) {
            case 'low-high':
                productsCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                productsCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilterProducts(productsCopy);
    };

    useEffect(() => {
        updateFilteredAndSortedProducts();
        setCurrentPage(1); // Reset ke halaman pertama jika filter berubah
    }, [category, subCategory, sortType, showSearch, search]);

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    // Produk yang akan ditampilkan pada halaman saat ini
    const currentProducts = filterProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
            <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-10 pt-10 border-t my-10'>
                {/* Bagian kiri untuk filter */}
                <div className='min-w-32 md:w-[12%] w-full'>
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

                    Filter kategori
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} md:block`}>
                        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                        <div className='relative text-sm font-light text-gray-700'>
                            {/* Dropdown list */}
                            <select
                                className='border border-gray-300 rounded-lg px-4 py-2 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
                                onChange={(e) => toggleCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {['Culture', 'Wild'].map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    {/* Filter subkategori */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} md:block`}>
                        <p className='mb-3 text-sm font-medium'>TYPE</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                            {/* Daftar subkategori */}
                            {/* {['WYSIWG Hard Coral', 'WYSIWG Soft Coral', 'WYSIWG Anemone', 'General Hard Coral', 'General Soft Coral', 'Fish'].map((type) => (
                            <p key={type} className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={type}
                                    onChange={toggleSubCategory}
                                />
                                {type}
                            </p>
                        ))} */}

                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'WYSIWYG Hard Coral'}
                                    onChange={toggleSubCategory}
                                />
                                WYSIWYG Hard Coral
                            </p>
                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'WYSIWYG Soft Coral'}
                                    onChange={toggleSubCategory}
                                />
                                WYSIWYG Soft Coral
                            </p>
                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'WYSIWYG Anemone'}
                                    onChange={toggleSubCategory}
                                />
                                WYSIWYG Anemone
                            </p>
                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'General Hard Coral'}
                                    onChange={toggleSubCategory}
                                />
                                General Hard Coral
                            </p>
                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'General Soft Coral'}
                                    onChange={toggleSubCategory}
                                />
                                General Soft Coral
                            </p>
                            <p className='flex gap-2'>
                                <input
                                    className='w-3'
                                    type='checkbox'
                                    value={'Fish'}
                                    onChange={toggleSubCategory}
                                />
                                Fish
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bagian kanan untuk produk */}
                <div className='flex-1 md:w-3/4 w-full'>
                    <div className='flex justify-between text-base sm:text-2xl mb-4'>
                        <Title text1={'ALL'} text2={'COLLECTIONS'} />
                        <select
                            onChange={(e) => setSortType(e.target.value)}
                            className='border-2 border-gray-300 text-sm px-2'
                        >
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {currentProducts.length === 0 ? (
                        <div className='flex items-center justify-center h-full min-h-[300px] text-center text-gray-500'>
                            <p>No Items Found</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 img-gallery lg:grid-cols-5 gap-4 gap-y-6'>
                            {currentProducts.map((item, index) => (
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

                    {/* Pagination Controls */}
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={handlePrevPage}
                            className='px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400'
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <p className='px-4 py-2 mx-2'>{currentPage} of {totalPages}</p>
                        <button
                            onClick={handleNextPage}
                            className='px-4 py-2 mx-2 bg-gray-300 rounded hover:bg-gray-400'
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>


            </div>
        </div>
            );

};

            export default Collection;
