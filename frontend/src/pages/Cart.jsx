import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; // Import library
import 'react-circular-progressbar/dist/styles.css';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);
    const [efficiency, setEfficiency] = useState(100); // State untuk menyimpan nilai efisiensi
    const [boxes, setBoxes] = useState([]); // State untuk menyimpan data semua box

    useEffect(() => {
        const tempData = [];
        let totalItems = 0; // Total barang di keranjang
        let maxCapacity = 50; // Kapasitas maksimum per box

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    });
                    totalItems += cartItems[items][item]; // Tambahkan jumlah barang
                }
            }
        }

        setCartData(tempData);

        // Hitung jumlah box dan distribusikan barang ke dalam masing-masing box
        const numOfBoxes = Math.ceil(totalItems / maxCapacity); // Hitung jumlah box
        const tempBoxes = [];

        for (let i = 0; i < numOfBoxes; i++) {
            const itemsInBox = Math.min(maxCapacity, totalItems - i * maxCapacity); // Barang dalam box ini
            const efficiency = Math.round((itemsInBox / maxCapacity) * 100); // Efisiensi box
            tempBoxes.push(efficiency);
        }

        setBoxes(tempBoxes); // Set data semua box
    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <h2 className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </h2>

            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);

                    return (
                        <div
                            key={index}
                            className='py-4 border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                        >
                            <div className='flex items-start gap-6'>
                                <img
                                    className='w-16 sm:w-20'
                                    src={productData.image[0]}
                                    alt=''
                                />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>
                                        {productData.name}
                                    </p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>
                                            {currency}{productData.price}
                                        </p>
                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                                            {item.size}
                                        </p>
                                    </div>
                                </div>
                            </div>

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

                            <img
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                                className='w-4 mr-4 sm:w-5 cursor-pointer'
                                src={assets.bin_icon}
                                alt='delete icon'
                            />
                        </div>
                    );
                })}
            </div>
            <div className='flex w-full justify-around gap-10'>
                {/* Diagram lingkaran untuk menampilkan efisiensi */}
                <div className="my-10 flex items-center justify-center gap-10 flex-wrap">
                    {boxes.map((efficiency, index) => (
                        <div key={index} style={{ width: 150, height: 150 }}>
                            <CircularProgressbar
                                value={efficiency}
                                text={`${efficiency}%`}
                                styles={buildStyles({
                                    textColor: efficiency < 85 ? 'red' : 'green',
                                    pathColor: efficiency < 85 ? 'red' : 'green',
                                    trailColor: '#d6d6d6',
                                })}
                            />
                            <p className="text-center mt-2">Box {index + 1}</p>
                        </div>
                    ))}
                </div>

                {/* Total dan tombol checkout */}
                <div className='flex justify-end my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-end'>
                            <button
                                onClick={() => navigate('/place-order')}
                                className='bg-black text-white text-sm my-8 px-8 py-5'
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Cart;
