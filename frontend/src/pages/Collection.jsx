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

    const CategoryChange = (e) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue ? [selectedValue] : []); // Perbarui state subCategory
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSubCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSubCategory(selectedValue ? [selectedValue] : []); // Perbarui state subCategory
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
        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-10 pt-10 border-t my-10 px-16'>
            {/* Bagian kiri untuk filter */}
            <div className=' w-full block  px-5  bg-white shadow-md z-0 md:hidden'>
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className='my-2 text-xl flex items-center gap-2 cursor-pointer'
                >
                    FILTERS
                    <img
                        className={`h-3 lg:hidden ${showFilter ? 'rotate-90' : ''} `}
                        src={assets.dropdown_icon}
                    />
                </p>

                {/* Filter kategori */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} lg:block`}>
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
                <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'} lg:block`}>
                    <p className='mb-3 text-sm font-medium' onClick={() => setShowFilter(!showFilter)}>TYPE<img
                        className={`h-3 md:hidden ${showFilter ? 'rotate-90' : ''} cursor-pointer`}
                        src={assets.dropdown_icon}
                    /></p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        {/* Daftar subkategori */}
                        {['WYSIWYG Hard Coral', 'WYSIWYG Soft Coral', 'WYSIWYG Anemone', 'General Hard Coral', 'General Soft Coral', 'Fish'].map((type) => (
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
                <div className='grid grid-cols-1 sm:grid-cols-[2fr_1fr] md:grid-cols-1 xl:flex xl:justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <div className='flex gap-2 flex-wrap'>
                        <div className='md:flex justify-center items-center hidden  '>
                            <p className='text-sm mr-3 font-medium'>Categories </p>
                            <p className='text-sm mr-3'> : </p>
                            <select
                                onChange={CategoryChange}
                                className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md"
                            >
                                <option value="">All Categories</option>
                                <option value="Culture">Culture</option>
                                <option value="Wild">Wild</option>

                            </select>
                        </div>

                        <div className='md:flex justify-center items-center hidden'>
                            <p className='text-sm mr-3 font-medium'>Type </p>
                            <p className='text-sm mr-3'> : </p>
                            <select
                                onChange={handleSubCategoryChange}
                                className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md"
                            >
                                <option value="">All Sub-Categories</option>
                                <option value="WYSIWYG Hard Coral">WYSIWYG Hard Coral</option>
                                <option value="WYSIWYG Soft Coral">WYSIWYG Soft Coral</option>
                                <option value="WYSIWYG Anemone">WYSIWYG Anemone</option>
                                <option value="General Hard Coral">General Hard Coral</option>
                                <option value="General Soft Coral">General Soft Coral</option>
                                <option value="Fish">Fish</option>
                            </select>
                        </div>
                        <div className='flex justify-center items-center '>
                            <p className='text-sm mr-3 font-medium'>Sort</p>
                            <p className='text-sm mr-3'> : </p>
                            <select
                                onChange={(e) => setSortType(e.target.value)}
                                className='border-2 border-gray-300 text-sm px-1 py-1 mr-4 rounded-md'
                            >
                                <option value="relevant">Sort by: Relevant</option>
                                <option value="low-high">Sort by: Low to High</option>
                                <option value="high-low">Sort by: High to Low</option>
                            </select>
                        </div>

                    </div>

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

            {/* <Footer /> */}
        </div>

    );

};

export default Collection;
