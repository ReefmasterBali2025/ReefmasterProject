// Mengimpor React dan hooks yang diperlukan seperti useContext, useEffect, dan useState
// Mengimpor konteks dari ShopContext untuk mendapatkan data produk dan pencarian
// Mengimpor aset dan komponen Title serta ProductItem
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import '../index.css'
import axios from 'axios'
import { backendUrl } from '../App';


// Komponen utama untuk menampilkan koleksi produk
const Collection = () => {
    // Mengambil data dari ShopContext menggunakan useContext
    const { search, showSearch } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');


    const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
    const ITEMS_PER_PAGE = 30; // Jumlah item per halaman
    const totalPages = Math.ceil(filterProducts.length / ITEMS_PER_PAGE); // Hitung total halaman
    const pageNumbers = [];
    const maxPageDisplay = 5; // Maksimum jumlah halaman yang terlihat sebelum titik-titik
    const [isLoading, setIsLoading] = useState(true);



    // Buat daftar halaman yang ditampilkan
    if (totalPages <= maxPageDisplay) {
        // Jika total halaman sedikit, tampilkan semua
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        // Jika total halaman banyak, tampilkan hanya sebagian dengan titik-titik
        if (currentPage <= 3) {
            pageNumbers.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
    }

    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const CategoryChange = (e) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue === "All Categories" ? [] : [selectedValue]);
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSubCategoryChange = (e) => {
        const selectedValue = e.target.value;
        setSubCategory(selectedValue === "All Sub Categories" ? [] : [selectedValue]);
    };

    // Fungsi untuk memperbarui produk yang difilter
    const updateFilteredAndSortedProducts = () => {
        let productsCopy = products.slice();



        // 🔍 Filter berdasarkan pencarian di SearchBar
        if (search.trim() !== '') {
            productsCopy = productsCopy.filter((item) =>
                item.commonName.toLowerCase().includes(search.toLowerCase()) ||
                item.latinName.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter berdasarkan kategori
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.coralType));
        }

        // Filter berdasarkan sub-kategori
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subType));
        }

        // **Hapus duplikasi untuk STOCK LIST**
        const uniqueStockList = new Map();
        productsCopy = productsCopy.filter((item) => {
            if (item.type === "STOCK LIST") {
                if (!uniqueStockList.has(item.commonName)) {
                    uniqueStockList.set(item.commonName, true);
                    return true; // Tambahkan hanya pertama kali ditemukan
                }
                return false; // Abaikan duplikasi
            }
            return true; // Produk lain tetap ditampilkan
        });

        // 🔃 Urutkan berdasarkan harga atau relevansi
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

        // Hitung index produk yang akan ditampilkan
        const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
        const currentProducts = productsCopy.slice(indexOfFirstProduct, indexOfLastProduct);

        setFilterProducts(productsCopy);
    };

    useEffect(() => {
        updateFilteredAndSortedProducts();
        setCurrentPage(1);
    }, [category, subCategory, sortType, showSearch, search]);

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

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

    useEffect(() => {
        setIsLoading(true);  // 🔄 Mulai loading
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/product/listCombine`); // 🔥 API untuk ambil data dari MongoDB
                if (response.data.success) {
                    setProducts(response.data.combineProduct); // ✅ Set data ke state
                } else {
                    console.error("Failed to fetch products!");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setIsLoading(false); // ✅ Selesai loading setelah fetch
        };

        fetchProducts();
    }, []);
    console.log(`category length : ${category.length}`);
    console.log(`subCategory length : ${subCategory.length}`);



    return (
        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-10 pt-10 border-t my-10 px-16'>
            {/* Animasi Loading */}
            {isLoading ? (
                <div className="flex justify-center items-center h-screen w-full">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
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
                                            <option value="All Categories">All Categories</option>
                                            <option value="CULTURE">Culture</option>
                                            <option value="WILD">Wild</option>

                                        </select>
                                    </div>

                                    <div className='md:flex justify-center items-center hidden'>
                                        <p className='text-sm mr-3 font-medium'>Type </p>
                                        <p className='text-sm mr-3'> : </p>
                                        <select
                                            onChange={handleSubCategoryChange}
                                            className="border-2 border-gray-300 text-sm px-2 py-1 rounded-md"
                                        >
                                            <option value="All Sub Categories">All Sub-Categories</option>
                                            <option value="WYSIWYG HARD CORAL">WYSIWYG Hard Coral</option>
                                            <option value="WYSIWYG SOFT CORAL">WYSIWYG Soft Coral</option>
                                            <option value="WYSIWYG ANEMONE">WYSIWYG Anemone</option>
                                            <option value="STOCK LIST HARD CORAL">General Hard Coral</option>
                                            <option value="STOCK LIST SOFT CORAL">General Soft Coral</option>
                                            <option value="FISH">Fish</option>
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
                                        {currentProducts.map((product) => (
                                            <ProductItem
                                                key={product._id}
                                                id={product._id}
                                                link_image={product.link_image} // ✅ Pastikan API mengembalikan link_image
                                                commonName={product.commonName}
                                                latinName={product.latinName}
                                                price={product.price}
                                                description={product.description}
                                                coralLocation={product.coralLocation}
                                            />
                                        ))}
                                </div>
                            )}

                            {/* Pagination */}
                            <div className="pagination">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>

                                {pageNumbers.map((page, index) =>
                                    page === '...' ? (
                                        <span key={index} className="dots">...</span>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(page)}
                                            className={currentPage === page ? "active" : ""}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* <Footer /> */}
                </>
            )}

        </div>

    );

};

export default Collection;
