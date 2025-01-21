import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$'; // Mata uang default yang digunakan di toko
    const delivery_fee = 10; // Biaya pengiriman tetap untuk setiap pesanan
    const [search, setSearch] = useState(''); // State untuk menyimpan kata kunci pencarian
    const [showSearch, setShowSearch] = useState(false); // State untuk mengontrol tampilan pencarian
    const [cartItems, setCartItems] = useState({}); // State untuk menyimpan item dalam keranjang
    const navigate = useNavigate(); // Hook untuk navigasi antar halaman
    const [boxesLength, setBoxesLength] = useState(0);
    const [citesCultureQuantity, setCitesCultureQuantity] = useState(0);  // Add state to store quantity
    const [citesWildQuantity, setCitesWildQuantity] = useState(0);  // Add state to store quantity
    const [weightOfItems, setWeightOfItems] = useState(0);
    const [totalAmountAll, setTotalAmount] = useState(0);

    const updateBoxesLength = (length) => {
        setBoxesLength(length)
    };

    // Function to update quantity of 'CITES Charge Culture Coral'
    const setCitesCultureQuantityInContext = (quantity) => {
        setCitesCultureQuantity(quantity);
    };

    const setCitesWildQuantityInContext = (quantity) => {
        setCitesWildQuantity(quantity)
    };

    const setWeightOfItemsInContext = (weight) => {
        setWeightOfItems(weight);
    };

    const setTotalAmountInContext = (amount) => {
        setTotalAmount(amount);
    }

    /**
     * Menambahkan item ke keranjang belanja.
     * Jika item dan ukuran sudah ada, jumlahnya akan ditambahkan.
     * Jika ukuran belum ada, maka akan dibuat ukuran baru.
     * Jika item belum ada, maka akan dibuat entri item baru.
     * 
     * @param {string} itemId - ID unik produk.
     * @param {string} size - Ukuran produk.
     * @param {number} quantity - Jumlah produk yang ditambahkan (default 1).
     */
    const addToCart = async (itemId, size, quantity = 1) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
        } else {
            cartData[itemId] = { [size]: quantity };
        }
        setCartItems(cartData);
    };

    /**
     * Menghitung total jumlah item dalam keranjang.
     * Menelusuri semua item dan ukuran untuk mendapatkan total jumlah.
     * 
     * @returns {number} - Total jumlah item dalam keranjang.
     */
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    // Tangani kesalahan (jika ada) tanpa menghentikan aplikasi
                }
            }
        }
        return totalCount;
    };

    /**
     * Memperbarui jumlah item pada ukuran tertentu dalam keranjang.
     * 
     * @param {string} itemId - ID unik produk.
     * @param {string} size - Ukuran produk.
     * @param {number} quantity - Jumlah baru yang ingin disimpan.
     */
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity; // Perbarui jumlah untuk ukuran tertentu
        setCartItems(cartData);
    };

    /**
     * Menghitung total harga semua item dalam keranjang.
     * Mengalikan harga produk dengan jumlahnya, lalu menjumlahkan semuanya.
     * 
     * @returns {number} - Total harga item dalam keranjang.
     */
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items); // Cari detail produk
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    // Tangani kesalahan (jika ada) tanpa menghentikan aplikasi
                }
            }
        }
        return totalAmount;
    };

    /**
     * Mencetak isi keranjang setiap kali ada perubahan.
     * Berguna untuk debugging.
     */
    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    /**
     * Menyediakan nilai context untuk diakses di seluruh aplikasi.
     * Meliputi detail produk, fungsi manajemen keranjang, dan variabel state.
     */
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        boxesLength, updateBoxesLength,
        citesCultureQuantity, setCitesCultureQuantity: setCitesCultureQuantityInContext,
        citesWildQuantity, setCitesWildQuantity: setCitesWildQuantityInContext,
        weightOfItems, setWeightOfItems: setWeightOfItemsInContext,
        totalAmountAll, setTotalAmount: setTotalAmountInContext
    };

    /**
     * Membungkus komponen anak dengan provider ShopContext
     * agar nilai-nilai context dapat diakses.
     */
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
