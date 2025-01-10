import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Mengimpor konteks toko untuk mengakses data global
import Title from '../components/Title'; // Komponen untuk menampilkan judul
import { assets } from '../assets/assets'; // Aset seperti ikon dan gambar
import CartTotal from '../components/CartTotal'; // Komponen untuk menampilkan total keranjang

const Cart = () => {
    // Mendapatkan data dan fungsi dari konteks toko
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]); // State lokal untuk menyimpan data keranjang yang diformat

    /**
     * useEffect ini digunakan untuk memformat data keranjang (`cartItems`) menjadi format
     * yang mudah digunakan di dalam komponen. Hanya item dengan kuantitas > 0 yang akan disimpan.
     */
    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items, // ID produk
                        size: item, // Ukuran produk
                        quantity: cartItems[items][item] // Kuantitas produk
                    });
                }
            }
        }
        console.log(tempData); // Debugging: menampilkan data keranjang yang diformat
        setCartData(tempData); // Menyimpan data keranjang ke state lokal
    }, [cartItems]); // Efek ini dijalankan ulang setiap kali `cartItems` berubah

    return (
        <div className='border-t pt-14'>
            {/* Bagian header */}
            <h2 className='text-2xl mb-3 '>
                <Title text1={'YOUR'} text2={'CART'} /> {/* Menampilkan judul dengan komponen Title */}
            </h2>

            {/* Bagian daftar item dalam keranjang */}
            <div>
                {
                    cartData.map((item, index) => {
                        // Mencari data produk berdasarkan ID
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div
                                key={index}
                                className='py-4 border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                            >
                                {/* Informasi produk */}
                                <div className='flex items-start gap-6'>
                                    <img
                                        className='w-16 sm:w-20'
                                        src={productData.image[0]}
                                        alt=''
                                    />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>
                                            {productData.name} {/* Nama produk */}
                                        </p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>
                                                {currency}{productData.price} {/* Harga produk */}
                                            </p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                                                {item.size} {/* Ukuran produk */}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Input untuk mengubah kuantitas */}
                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(item._id, item.size, Number(e.target.value))
                                    }
                                    type='number'
                                    min={1}
                                    defaultValue={item.quantity}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                />

                                {/* Ikon untuk menghapus item */}
                                <img
                                    onClick={() => updateQuantity(item._id, item.size, 0)}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                                    src={assets.bin_icon}
                                    alt='delete icon'
                                />
                            </div>
                        );
                    })
                }
            </div>

            {/* Bagian total dan tombol checkout */}
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal /> {/* Komponen untuk menampilkan total harga */}
                    <div className='w-full text-end'>
                        <button
                            onClick={() => navigate('/place-order')}
                            className='bg-black text-white text-sm my-8 px-8 py-5'
                        >
                            PROCEED TO CHECKOUT {/* Tombol untuk melanjutkan ke halaman checkout */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
