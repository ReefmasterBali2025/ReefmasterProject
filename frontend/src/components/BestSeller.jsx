// Import library dan komponen yang diperlukan
import React, { useContext, useEffect, useState } from 'react' // Mengimpor React dan hooks untuk state dan efek samping
import { ShopContext } from '../context/ShopContext' // Mengimpor konteks toko untuk mengambil data produk
import Title from './Title'; // Mengimpor komponen untuk menampilkan judul
import ProductItem from './ProductItem'; // Mengimpor komponen untuk menampilkan produk

// Deklarasi komponen BestSeller
const BestSeller = () => {

    // Mengambil data produk dari ShopContext menggunakan useContext
    const { products } = useContext(ShopContext);
    // State lokal untuk menyimpan daftar produk best seller
    const [bestseller, setBestSeller] = useState([]);

    // Efek samping untuk memfilter produk best seller saat komponen pertama kali dirender
    useEffect(() => {
        // Memfilter produk yang memiliki properti bestseller bernilai true
        const bestProduct = products.filter((item) => (item.bestseller))
        // Menyimpan 5 produk terbaik pertama ke dalam state bestseller
        setBestSeller(bestProduct.slice(0, 5))
    }, []) // Dependensi kosong [] berarti efek ini hanya dijalankan sekali

    // Mengembalikan elemen JSX yang akan dirender
    return (
        <div className='my-10'> {/* Memberikan margin vertikal */}
            <div className='text-center text-3xl py-8'> {/* Mengatur teks di tengah dengan ukuran besar */}
                <Title text1={'BEST'} text2={'SELLER'} /> {/* Menampilkan judul menggunakan komponen Title */}
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    {/* Menampilkan deskripsi teks dummy Lorem Ipsum */}
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>

            {/* Menampilkan daftar produk dalam grid yang responsif */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    // Melakukan iterasi pada state bestseller untuk merender setiap produk
                    bestseller.map((item, index) => (
                        <ProductItem
                            key={index} // Menentukan key unik untuk setiap item
                            id={item._id} // ID produk
                            name={item.name} // Nama produk
                            image={item.image} // URL gambar produk
                            price={item.price} // Harga produk
                        />
                    ))
                }
            </div>
        </div>
    )
}

// Mengekspor komponen BestSeller agar bisa digunakan di tempat lain
export default BestSeller
