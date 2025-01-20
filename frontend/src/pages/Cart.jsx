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
        let totalVolume = 0; // Total volume plastik
        const boxVolume = (47 * 32 * 29) * 0.85; // Volume box dengan efisiensi 85%

        // Menghitung total volume barang di keranjang
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const product = products.find((p) => p._id === items);
                    const sizeData = product.sizes.find((s) => s.size === item);
                    const volumePerItem = (22 / 7) * sizeData.plasticSize * sizeData.plasticHeight;

                    totalVolume += volumePerItem * cartItems[items][item];
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item],
                        volume: volumePerItem * cartItems[items][item],
                    });
                }
            }
        }

        setCartData(tempData);

        // Menghitung jumlah box yang dibutuhkan
        const boxUtilization = Math.ceil(totalVolume / boxVolume);
        let remainingVolume = totalVolume; // Sisa volume yang belum teralokasi ke box
        const tempBoxes = [];

        // Alokasikan volume box berdasarkan persentase setiap barang
        for (let i = 0; i < boxUtilization; i++) {
            const currentBoxVolume = Math.min(boxVolume, remainingVolume);
            const efficiency = Math.round((currentBoxVolume / boxVolume) * 100);

            // Membagi volume ke barang-barang yang ada di keranjang
            let boxVolumeLeft = currentBoxVolume;
            const itemAllocations = tempData.map(item => {
                // Hitung volume yang dapat dialokasikan per barang
                const itemVolume = (item.volume / totalVolume) * currentBoxVolume; // Volume per barang di box
                const allocatedVolume = Math.min(itemVolume, boxVolumeLeft); // Alokasikan volume yang bisa masuk
                boxVolumeLeft -= allocatedVolume; // Kurangi volume yang masih tersisa
                return {
                    ...item,
                    allocatedVolume
                };
            });

            // Push hasil alokasi box
            tempBoxes.push({
                efficiency,
                itemAllocations
            });

            // Kurangi volume yang tersisa setelah mengalokasikan box
            remainingVolume -= currentBoxVolume;

            // Jika volume sudah habis, stop looping
            if (remainingVolume <= 0) break;
        }

        setBoxes(tempBoxes);
    }, [cartItems]);



    return (
        <div className='border-t my-14 px-16'>
            <h2 className='text-2xl mb-3 pt-10'>
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
            <div className='flex w-full flex-col-reverse md:flex-row justify-around gap-10'>
                {/* Diagram lingkaran untuk menampilkan efisiensi */}
                <div className="mt-0 mb-5 flex items-center justify-center gap-10 flex-wrap">
                    {boxes.map((box, index) => (
                        <div key={index} style={{ width: 150, height: 150 }}>
                            <CircularProgressbar
                                value={box.efficiency}
                                text={`${box.efficiency}%`}
                                styles={buildStyles({
                                    textColor: box.efficiency < 85 ? 'red' : 'green',
                                    pathColor: box.efficiency < 85 ? 'red' : 'green',
                                    trailColor: '#d6d6d6',
                                })}
                            />
                            <p className="text-center mt-2">Box {index + 1}</p>
                            <div className="mt-2">
                                {box.itemAllocations.map((allocation, idx) => (
                                    <div key={idx} className="text-xs">
                                        <span>{allocation._id} ({allocation.size})</span>: {allocation.allocatedVolume.toFixed(2)} cm³
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total dan tombol checkout */}
                <div className='flex justify-start md:justify-end my-8'>
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
